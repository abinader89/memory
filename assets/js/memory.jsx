import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}

const ROWS = 4;
const TILE = function(props) {
    return <div className="customTile" onClick={props.onClick}>
        {props.letter.show || props.letter.value}
    </div>;
}

class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = { tiles: [], clicks: -1, flipped_tile: null, };
    // join the game
    this.channel.join()
    .receive("ok", this.got_view.bind(this))
    .receive("error", resp => { console.log("Unable to join", resp); });
  }

  got_view(view) {
        console.log("joined successfully!", view);
        this.setState(view.game);
    }

  reset(ev) {
      if (confirm("Are you sure you want to reset?")) {
          // push the reset command down the channel and get the new state
          this.channel.push("reset", {})
          .receive("ok", this.got_view.bind(this));
      }
  }

  lobby(ev) {
      if (confirm("Are you sure you want to quit?")) {
          // go back to the lobby but save the state
          window.location.href = "/";
      }
  }

  click(ii, ev) {
      if (this.state.clicks % 2 != 0) {
          console.log("clicks is even");
          this.channel.push("click", {index: ii})
              .receive("ok", (resp) => {this.setState(resp.game);
                  setTimeout(this.flip_back.bind(this, ii), 1000);});
      } else {
         console.log("clicks is odd");
         this.channel.push("click", {index: ii})
              .receive("ok", (resp) => {this.setState(resp.game);});
      }
  }

    flip_back(ii, ev) {
        var current_tile = this.state.tiles[ii];
        var showing = this.state.flipped_tile;
        console.log("value of current tile: ", current_tile);
        console.log("value of tile last flipped: ", showing);
        if (showing.value != current_tile.value) {
            console.log("saved value != current value");
            var new_tiles = this.state.tiles;
            for (var jj = 0; jj < new_tiles.length; jj++) {
                if (new_tiles[jj].value == current_tile.value) {
                    new_tiles[jj].show = false;
                }
                if (new_tiles[jj].value == showing.value) {
                    new_tiles[jj].show = false;
                }
            }
            var new_state = { tiles: new_tiles, clicks: this.state.clicks, flipped_tile: this.state.flipped_tile, };
            this.setState(new_state);
        }
    }

  render() {
    let clicks = 
          <div className="row">
          <h4>Clicks: &nbsp; </h4>
          <p>{this.state['clicks']}</p>
          </div>;
    let reset = <div className="column">
          <p><button className="black-button" onClick={this.reset.bind(this)}>Reset</button></p>
          </div>;
    let lobby = <div className="column">
          <p><button className="black-button" onClick={this.lobby.bind(this)}>Save & Quit</button></p>
          </div>;
    let grid = _.chunk(this.state['tiles'], ROWS)
      return <div className="container">
              {clicks}
              {grid.map((row, jj) => {
                  return <div className="row" key={jj}>
                      {row.map((letter, ii) => 
                          <TILE key={jj * ROWS + ii}  
                          onClick={this.click.bind(this, (jj * ROWS + ii))} 
                          letter={letter} />)}
                      </div>
              })
              }
          <div className="column column-40" 
                style={{float: "right"}}>
            {reset}
            {lobby}
          </div>
      </div>;
  }
}
