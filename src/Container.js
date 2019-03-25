import React from "react";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import "./Container.css";

export const defaultBoxColor = "orange";

@observer
class Container extends React.Component {
  @observable isHovering = false;

  @computed get styleColor() {
    return {
      backgroundColor: this.props.item.color
        ? this.props.item.color
        : defaultBoxColor
    };
  }

  render() {
    const isContainer = this.props.item.type === "container";
    return (
      <div className={isContainer ? "container" : ""}>
        {!isContainer ? (
          <div>
            <button
              className="box"
              style={this.styleColor}
              onClick={this.changeColor}
              onMouseEnter={() => this.setIsHovering(true)}
              onMouseLeave={() => this.setIsHovering(false)}
            />
            {this.showDeleteBtnOnHover(this.isHovering)}
          </div>
        ) : this.props.item.items && this.props.item.items.length > 0 ? (
          this.props.item.items.map((value, index) => {
            return (
              <Container
                item={value}
                key={index}
                removeItem={this.removeChildItem.bind(this)}
              />
            );
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
            {this.showDeleteBtnOnHover(this.isHovering)}
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

  showDeleteBtnOnHover(isHovering) {
    return (
      isHovering && (
        <div
          className={
            this.props.item.type === "box"
              ? "hover-delete-box"
              : "hover-delete-container"
          }
          onMouseEnter={() => this.setIsHovering(true)}
          onMouseLeave={() => this.setIsHovering(false)}
        >
          <button className="delete-btn" onClick={this.removeThisItem}>
            x
          </button>
        </div>
      )
    );
  }

  setIsHovering = bool => {
    this.isHovering = bool;
  };

  addContainer = () => {
    this.props.item.items.push({ type: "container", items: [] });
  };

  addBox = () => {
    this.props.item.items.push({
      type: "box",
      color: defaultBoxColor
    });
  };

  removeThisItem = () => {
    if (this.props.removeItem) this.props.removeItem(this.props.item);
  };

  removeChildItem = item => {
    if (this.props.item.items) {
      this.props.item.items.remove(item);
    }
  };

  changeColor = () => {
    this.props.item.color =
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8);
  };
}

export default Container;
