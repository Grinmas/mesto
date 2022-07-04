class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.place')
    .cloneNode(true)

    return cardElement
  }


  _setEventListeners() {
    this._elementTemplate.querySelector('.place__button').addEventListener('click', () => {
      this._handleLikesClick();
    });

    this._elementTemplate.querySelector('.place__delete-button').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._elementTemplate.querySelector('.place__image').addEventListener('click', () => {
      this._handleImageClick();
    });

  }

  _handleLikesClick() {
    this._elementTemplate.querySelector('.place__button').classList.toggle('place__button_active');
  }

  _handleDeleteClick() {
    this._elementTemplate.remove();
  }

  _handleImageClick() {
    const popupFullCard = document.querySelector('.popup_full-card');
    popupFullCard.classList.add('popup_opened');
    popupFullCard.querySelector('.popup__image').src = this._link;
    popupFullCard.querySelector('.popup__image').alt = this._name;
    popupFullCard.querySelector('.popup__caption').textContent = this._name;
  }

  generateCard() {
    this._elementTemplate = this._getTemplate();
    this._setEventListeners();

    this._elementTemplate.querySelector('.place__image').src = this._link;
    this._elementTemplate.querySelector('.place__title').textContent = this._name;

    return this._elementTemplate;
  }

}

export {Card}