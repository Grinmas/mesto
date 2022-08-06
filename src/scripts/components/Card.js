
class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    
    this._handleCardClick = handleCardClick;

    this._elementTemplate = this._getTemplate();
    this._likeButton = this._elementTemplate.querySelector('.place__button');
    this._deleteButton = this._elementTemplate.querySelector('.place__delete-button');
    this._cardImage = this._elementTemplate.querySelector('.place__image');
    this._cardTitle = this._elementTemplate.querySelector('.place__title');
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
    this._likeButton.addEventListener('click', () => {
      this._handleLikesClick();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }

  _handleLikesClick() {
    this._likeButton.classList.toggle('place__button_active');
  }

  _handleDeleteClick() {
    this._elementTemplate.remove();
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._elementTemplate;
  }

}

export {Card}