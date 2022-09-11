export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(сards) {
    сards.forEach(item => {
      this._renderer(item)
    });
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}