import React from "react";
import { ChromePicker } from "react-color";
import { computed } from "mobx";
import { observer } from "mobx-react";
import "./Container.css";

export const defaultBoxColor = "orange";

@observer
class Container extends React.Component {
  state = {
    displayColorPicker: false,
    isHovering: false
  };

  @computed get styleColor() {
    return {
      backgroundColor: this.props.item.color
        ? this.props.item.color
        : defaultBoxColor
    };
  }

  render() {
    const popover = {
      position: "absolute",
      zIndex: "2"
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };
    const isContainer = this.props.item.type === "container";
    return (
      <div className={isContainer ? "container" : ""}>
        {!isContainer ? (
          <div>
            <button
              className="box"
              style={this.styleColor}
              onClick={this.handleClick}
              onMouseEnter={() => this.setState({ isHovering: true })}
              onMouseLeave={() => this.setState({ isHovering: false })}
            />
            {this.state.displayColorPicker ? (
              <div style={popover}>
                <div style={cover} onClick={this.handleClose} />
                <ChromePicker
                  color={this.props.item.color}
                  onChange={this.handleChange}
                />
              </div>
            ) : null}
            {this.showDeleteBtnOnHover()}
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
              onMouseEnter={() => this.setState({ isHovering: true })}
              onMouseLeave={() => this.setState({ isHovering: false })}
            >
              Add
            </button>
            {this.showDeleteBtnOnHover()}
            {this.state.isHovering && (
              <div
                className="hover-btn"
                onMouseEnter={() => this.setState({ isHovering: true })}
                onMouseLeave={() => this.setState({ isHovering: false })}
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

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.props.item.color = color.hex;
  };

  showDeleteBtnOnHover() {
    return (
      this.state.isHovering && (
        <div
          className={
            this.props.item.type === "box"
              ? "hover-delete-box"
              : "hover-delete-container"
          }
          onMouseEnter={() => this.setState({ isHovering: true })}
          onMouseLeave={() => this.setState({ isHovering: false })}
        >
          <button className="delete-btn" onClick={this.removeThisItem}>
            x
          </button>
        </div>
      )
    );
  }

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

  // this function assigns random color to the box
  changeColor = () => {
    this.props.item.color =
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8);
  };
}

export default Container;
