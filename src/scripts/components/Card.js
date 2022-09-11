
class Card {
  constructor(data, cardSelector, handleCardClick, handleSetLike, handleDeleteLike,handleDeleteClick, userId) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._elementTemplate = this._getTemplate();
    this._likeButton = this._elementTemplate.querySelector('.place__button');
    this._deleteButton = this._elementTemplate.querySelector('.place__delete-button');
    this._cardImage = this._elementTemplate.querySelector('.place__image');
    this._cardTitle = this._elementTemplate.querySelector('.place__title');
    this._cardLikeCounter = this._elementTemplate.querySelector('.place__like-counter');
    this._popupConfirmDelete = document.querySelector('.popup_confirm-delete');
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
      if (this._likeButton.classList.contains('place__button_active')) {
        this._handleDeleteLike(this._cardId);
      } else { this._handleSetLike(this._cardId); }
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

  }

  handleLikeBtn(data) {
    this._likeClick = data.likes;
    this._cardLikeCounter.textContent = this._likeClick.length;
    this._likeButton.classList.toggle('place__button_active');
  }

  deleteCard() {
    this._elementTemplate.remove();
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._cardLikeCounter.textContent = this._likes.length;
    this._isCardLiked();
    this._isDeleteBtn();

    return this._elementTemplate;
  }

  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeButton.classList.add('place__button_active');
    }
  }
 
  _isDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove();
    }
  }

}

export {Card}