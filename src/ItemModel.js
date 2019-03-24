import { observable } from "mobx";
import { defaultBoxColor } from "./Container";

export default class ItemModel {
  @observable type;
  @observable color;
  @observable items;

  constructor(obj) {
    this.type = obj.type ? obj.type : "container";
    this.color = obj.color ? obj.color : this.color === "box" ? defaultBoxColor : undefined;
    this.items = obj.items ? obj.items : this.type === "container" ? observable([]) : undefined;
  }
}
