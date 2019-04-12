import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}

const ROWS = 4;
const TILE = function(props) {
    return <div className="customTile" onClick={props.onClick}>
        {props.letter}
    </div>;
}

class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
        tiles: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
        clicks: 0,
    };
  }

  reset(_ev) {
      if (confirm("Are you sure?")) {
          // push the reset command down the channel and get the new state
      }
  }

  guess(_ev) {

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
    let grid = _.chunk(this.state['tiles'], ROWS)
      return <div className="container">
          {clicks}
              {grid.map((row, j) => {
                  return <div className="row" key={j}>
                      {row.map((letter, i) => <TILE key={j * ROWS + i} letter={letter} />)}
                      </div>
              })
              }
          <div style={{float: "right"}}>
            {reset}
          </div>
      </div>;
  }
}
