import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}

const ROWS = 4;
const TILE = function(props) {
    return <div className="customTile" onClick={props.onClick}>
        {(props.letter.show || props.letter.matched) && props.letter.value}
    </div>;
}

class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.delay = false;
    this.channel = props.channel;
    this.state = { tiles: [], clicks: -1, flipped_tile: null, };
    // join the game
    this.channel.join()
    .receive("ok", this.got_view.bind(this))
    .receive("error", resp => { console.log("Unable to join", resp); });
  }
    debug(ev) {
        console.log("flipped tile: ", this.state.flipped_tile);
        console.log("tiles: ", this.state.tiles);
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
      if (this.delay) {
          console.log("delay in progress...");
          return;
      }
      if (this.state.flipped_tile == null) {
          this.channel.push("click", {index: ii})
              .receive("ok", (resp) => {this.setState(resp.game);});
      } else {
          this.delay = true;
          this.channel.push("delay", {index: ii})
              .receive("ok", (resp) => {this.setState(resp.game);
                  setTimeout(this.flip_back.bind(this, ii, ev), 1000);});
      }
  }


    flip_back(ii, ev) {
        console.log("flip_back");
        this.channel.push("click", {index: ii})
            .receive("ok", (resp) => {this.setState(resp.game);});
        this.delay = false;
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
          <div className="row">
              {clicks}
          </div>
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
