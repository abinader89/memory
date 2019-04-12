import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}

const ROWS = 4;
const TILE = function(props) {
    return <div className="customTile" onClick={props.onClick}>
        {props.letter.show && props.letter.value}
    </div>;
}

class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = { tiles: [], clicks: -1, };
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
      this.channel.push("click", {index: ii})
      .receive("ok", (resp) => {this.setState(resp.game);});
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
              {grid.map((row, j) => {
                  return <div className="row" key={j}>
                      {row.map((letter, i) => 
                          <TILE key={j * ROWS + i}  
                          onClick={this.click.bind(this, (j * ROWS + i))} 
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
