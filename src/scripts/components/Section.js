export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialCards = items //массив данных, которые нужно добавить на страницу при инициализации класса по условия ПР8
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._initialCards.forEach(item => {
      this._renderer(item)
    });
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}