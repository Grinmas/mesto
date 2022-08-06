import { FormValidation } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

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
const submitButton = popupAddCard.querySelector('.popup__form-submit');
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


const editProfilePopup = new PopupWithForm ({
  popupSelector: '.profile-popup',
  handleFormSubmit: (formData) => {
    const infoUserSet = userInfo.setUserInfo(formData)
  }
});
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__subtitle'
})

editButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupNameInput.value = info.username;
  popupJobInput.value = info.job;
  editProfilePopup.open();
  formValidators[ profileForm.getAttribute('name') ].resetValidation();
})



const addCardPopup = new PopupWithForm ({
  popupSelector: '.popup_add-card',
  handleFormSubmit: (formData) => {
    const cardElement = createCard(formData);
    cardsList.addItem(cardElement)
  }
  
})
addCardPopup.setEventListeners();


profileAddButton.addEventListener('click', () => {
  addCardPopup.open();
  formValidators[ formAddCard.getAttribute('name') ].resetValidation();
})

const viewFullCard = new PopupWithImage('.popup_full-card');
viewFullCard.setEventListeners();

function handleCardClick(name, link) {
  imageFullCard.src = link;
  imageFullCard.alt = name;
  captionFullCard.textContent = name;
  viewFullCard.open({name, link})
}

function createCard(item) {
  const userCard = new Card(item, '#place-template', handleCardClick);
  const cardElement = userCard.generateCard();
  return cardElement
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  },
},
places);
cardsList.renderItems();


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
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
enableValidation(config);

