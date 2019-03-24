import React from "react";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import "./Container.css";
import ItemModel from "./ItemModel";

export const defaultBoxColor = "orange";

@observer
class Container extends React.Component {
  item = observable(
    this.props.item
      ? this.props.item
      : new ItemModel({ type: "container", items: [] })
  );

  @observable isHovering = false;

  @computed get styleColor() {
    return {
      backgroundColor: this.item.color ? this.item.color : defaultBoxColor
    };
  }

  render() {
    const isContainer = this.item.type === "container";
    return (
      <div className={isContainer ? "container" : ""}>
        {!isContainer ? (
          <button
            className="box"
            style={this.styleColor}
            onClick={this.changeColor}
          />
        ) : this.item.items && this.item.items.length > 0 ? (
          this.item.items.map((value, index) => {
            return <Container item={value} key={index} />;
          })
        ) : null}
        {isContainer && (
          <div>
            <button
              className="btn"
              onMouseEnter={() => this.setIsHovering(true)}
              onMouseLeave={() => this.setIsHovering(false)}
            >
              Add
            </button>
            {this.isHovering && (
              <div
                className="hover-btn"
                onMouseEnter={() => this.setIsHovering(true)}
                onMouseLeave={() => this.setIsHovering(false)}
              >
                <button className="btn" onClick={this.addBox}>
                  Box
                </button>
                <button className="btn" onClick={this.addContainer}>
                  Container
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  setIsHovering = bool => {
    this.isHovering = bool;
  };

  addContainer = () => {
    this.item.items.push({ type: "container", items: [] });
  };

  addBox = () => {
    this.item.items.push({
      type: "box",
      color: defaultBoxColor
    });
  };

  changeColor = () => {
    this.item.color =
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8);
  };
}

export default Container;
