import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(e) {
    super(e);
    this.state = {
      data: "",
      curentData: ""
    }
  }
  onInput = e => {
    e.preventDefault();
    this.setState({ curentData: e.target.value });
  }

  reverse = () => {
    this.setState({ data: this.state.curentData.split('').reverse().join(""), curentData: "" });
  }

  render() {
    let result = this.state.data;
    return (
      <div className="App">
        Input String:
          <input type="text" value={this.state.curentData} onChange={this.onInput}></input>
        <button onClick={this.reverse}>Revrese</button>
        <p> Reversed String: {result}</p>
      </div>
    );
  }
}

export default App;
