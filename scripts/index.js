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
    popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popupElement)
      };
    });
  });
};

closePopupOverlay();


profileAddButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

initialCards.forEach((data) => {
  const defaultCard = new Card(data, '#place-template');
  const cardElement = defaultCard.generateCard();
  places.append(cardElement);
});

function addCard (evt) {
  evt.preventDefault();
  const data = { name: inputPlaceName.value, link: inputPlaceSrc.value };
  const userCard = new Card(data, '#place-template')
  const cardElement = userCard.generateCard();
  places.append(cardElement);
  
};
 
formAddCard.addEventListener('submit', addCard);


//Валидация форм:

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
  const validationPopupForm = new FormValidation(settings, formElement);
  validationPopupForm.enableValidation();
})