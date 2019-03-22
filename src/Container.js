import React from "react";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import "./Container.css";
import ItemModel from "./ItemModel";

const defaultBoxColor = "orange";

@observer
class Container extends React.Component {
  item = this.props.item
    ? this.props.item
    : new ItemModel({ type: "container", items: [] });
  /* : new ItemModel({
        type: "container",
        items: [
          { type: "box" },
          {
            type: "container",
            items: [
              { type: "box", color: "green" },
              { type: "box", color: "red" }
            ]
          }
        ]
      }); */

  @observable isHovering = false;

  @computed get styleColor() {
    return {
      backgroundColor: this.item.color ? this.item.color : defaultBoxColor
    };
  }

  render() {
    const isContainer = this.item.type === "container" && this.item.items;
    return (
      <div className={isContainer ? "container" : ""}>
        {isContainer ? (
          this.item.items.map((value, index) => {
            return <Container item={value} key={index} />;
          })
        ) : (
          <button
            className="box"
            style={this.styleColor}
            onClick={this.changeColor}
          />
        )}
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
    console.log(this.item.color);
  };
}
export default Container;

// class Store {
//     @observable container = {type:'container', items: [], color: null};

//     @action
// 	addItem (item) {
// 		this.todos.push(new TodoModel(this, Utils.uuid(), title, false));
// 	}
// }

// @observer
// class Container extends React.Component {
//     containers = observable([])
//     render() {
//         const appState = observable({
//             boxColor: defaultBoxColor
//         })
//         return (
//             <Box color={appState.boxColor}/>
//         );
//     }
// }
// export default Container;

// @observer
// class Box extends React.Component {
//     @computed get boxColor() {
//     return this.props.color
//   }
//     render() {
//         return (
//             <button className="square" style={this.boxColor} onClick={this.changeColor}>
//                 {this.props.value}
//             </button>
//         );
//     }

//     changeColor = () => {
//         const p = this.props;
//         p.color = {
//             backgroundColor: '#ffff',
//             borderColor: '#ff9933'
//         }
//     }
// }
