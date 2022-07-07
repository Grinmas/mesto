import { FormValidation } from "./FormValidator.js";
import { Card } from "./Card.js";

const popupProfile = document.querySelector('.profile-popup');
const editButton = document.querySelector('.profile__edit-button');
const profileCloseBtn = document.querySelector('.popup__close-button');
const profileForm = document.querySelector('.popup__form');
const popupNameInput = document.querySelector('.popup__input_el_firstname');
const popupJobInput = document.querySelector('.popup__input_el_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const submitButton = popupAddCard.querySelector('.popup__form-submit')
const closeAddCard =document.querySelector('.popup__close-add-card');
const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template').content;
const place = placeTemplate.querySelector('.place');
const formAddCard = document.querySelector('.popup__form_add-card');
const inputPlaceName = document.querySelector('.popup__input_el_place-name');
const inputPlaceSrc = document.querySelector('.popup__input_el_place-src');
const popupFullCard = document.querySelector('.popup_full-card');
const imageFullCard = popupFullCard.querySelector('.popup__image');
const captionFullCard = popupFullCard.querySelector('.popup__caption');
const closeFullCardBtn = popupFullCard.querySelector('.popup__close-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupList = Array.from(document.querySelectorAll('.popup'));

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpenedElement = document.querySelector('.popup_opened');
    closePopup(popupOpenedElement);
  };
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  const valueNameInput = popupNameInput.value;
  const valueJobInput = popupJobInput.value;
  profileTitle.textContent = valueNameInput;
  profileSubtitle.textContent =  valueJobInput;
  closePopup(popupProfile);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

editButton.addEventListener('click', function () {
  formValidators[ profileForm.getAttribute('name') ].resetValidation();
  openPopup(popupProfile);
  popupNameInput.value = profileTitle.textContent;
  popupJobInput.value = profileSubtitle.textContent;
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const closePopupOverlay = () => {
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popupElement)
      };
    });
  });
};

closePopupOverlay();


profileAddButton.addEventListener('click', function () {
  formValidators[ formAddCard.getAttribute('name') ].resetValidation();
  formAddCard.reset();
  openPopup(popupAddCard);
});

function handleCardClick(name, link) {
  imageFullCard.src = link;
  imageFullCard.alt = name;
  captionFullCard.textContent = name;
  openPopup(popupFullCard);
}

function createCard(item) {
  const userCard = new Card(item, '#place-template', openPopup, handleCardClick);
  const cardElement = userCard.generateCard();
  return cardElement
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  places.prepend(cardElement);
});

function addCard (evt) {
  evt.preventDefault();
  const data = { name: inputPlaceName.value, link: inputPlaceSrc.value };
  const cardElement = createCard(data);
  places.prepend(cardElement);
  closePopup(popupAddCard);
  formAddCard.reset();
};
 
formAddCard.addEventListener('submit', addCard);

//Валидация форм:

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidation(config, formElement);
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
enableValidation(config);

formValidators[ profileForm.getAttribute('name') ].resetValidation();
formValidators[ formAddCard.getAttribute('name') ].resetValidation();