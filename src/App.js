import React, { Component } from "react";
import Container from "./Container";
import "./App.css";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value1: "", value2: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  @observable item = JSON.parse('{"type":"container","items":[{"type":"box","color":"green"}]}');//null;
  // {
  //   type: "container",
  //   items: [{ type: "box", color: "green" }]
  // };

  render() {
    return (
      <div className="App">
        <div className="form-inline">
          <Container item={this.item} />
        </div>
        <div className="form-inline">
          <textarea
            className="textbox"
            rows="3"
            cols="80"
            onChange={this.handleChange}
          />
          <button className="btn" onClick={this.buildFromString}>
            Build
          </button>
        </div>
        <div className="form-inline">
          <button className="btn" onClick={this.createJSON}>
            Create JSON
          </button>
          <textarea
            className="textbox"
            rows="3"
            cols="80"
            value={this.state.value2}
            readOnly
          />
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ value1: event.target.value });
  }

  buildFromString = () => {
    this.item = JSON.parse(JSON.stringify(this.state.value1));
    console.log(this.item);
  };

  createJSON = () => {
    this.setState({ value2: JSON.stringify(this.item) });
  };
}

export default App;
