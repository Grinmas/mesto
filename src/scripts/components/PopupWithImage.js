import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageFullCard = this._popup.querySelector('.popup__image');
    this._captionFullCard = this._popup.querySelector('.popup__caption');
  }

  open({ name, link }) {
    this._imageFullCard.src = link;
    this._imageFullCard.alt = name;
    this._captionFullCard.textContent = name;
    super.open();
  }
}