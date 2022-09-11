import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  submitCallback(remove) {
    this._handleSubmit = remove;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleSubmit();
      super.close()
    })
  }

}