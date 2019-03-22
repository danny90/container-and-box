import { observable } from "mobx";

export default class ItemModel {
  @observable type;
  @observable color;
  @observable items;

  constructor(obj) {
    this.type = obj.type;
    this.color = obj.color ? obj.color : 'orange';
    this.items = obj.items;
  }
}
