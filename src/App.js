import React, { Component } from "react";
import Container from "./Container";
import ItemModel from "./ItemModel";
import "./App.css";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", jsonStr: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  @observable item = new ItemModel({});

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
          <button className="btn-normal" onClick={this.buildFromString}>
            Build
          </button>
        </div>
        <div className="form-inline">
          <button className="btn-normal" onClick={this.createJSON}>
            Create JSON
          </button>
          <textarea
            className="textbox"
            rows="3"
            cols="80"
            value={this.state.jsonStr}
            readOnly
          />
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  buildFromString = () => {
    try {
      var obj = JSON.parse(
        this.state.value.substr(1, this.state.value.length - 2)
      );
      this.item = new ItemModel(obj);
    } catch (e) {
      alert("Invalid JSON format! Please check your input.");
    }
  };

  createJSON = () => {
    this.setState({ jsonStr: `"${JSON.stringify(this.item)}"` });
  };
}

export default App;
