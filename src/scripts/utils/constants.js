const popupProfile = document.querySelector('.profile-popup');
const avatarImage = document.querySelector('.profile__avatar')
const editButton = document.querySelector('.profile__edit-button');
const avatarEditButton = document.querySelector('.profile__avatar-btn');
const profileCloseBtn = document.querySelector('.popup__close-button');
const profileForm = document.querySelector('.popup__form');
const popupNameInput = document.querySelector('.popup__input_el_firstname');
const popupJobInput = document.querySelector('.popup__input_el_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCardAdd = document.querySelector('.popup_add-card');
const submitButton = popupCardAdd.querySelector('.popup__form-submit');
const closeAddCard =document.querySelector('.popup__close-add-card');
const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template').content;
const place = placeTemplate.querySelector('.place');
const formAddCard = document.querySelector('.popup__form_add-card');
const formAvatar = document.querySelector('.popup__form_avatar');
const inputPlaceName = document.querySelector('.popup__input_el_place-name');
const inputPlaceSrc = document.querySelector('.popup__input_el_place-src');
const popupFullCard = document.querySelector('.popup_full-card');
const imageFullCard = popupFullCard.querySelector('.popup__image');
const captionFullCard = popupFullCard.querySelector('.popup__caption');
const closeFullCardBtn = popupFullCard.querySelector('.popup__close-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupList = Array.from(document.querySelectorAll('.popup'));

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export { 
  popupProfile, avatarImage, editButton, avatarEditButton, profileCloseBtn,
  profileForm, popupNameInput, popupJobInput, profileTitle, profileSubtitle, profileAddButton,
  popupCardAdd, submitButton, closeAddCard, places, placeTemplate, place, formAddCard, formAvatar,
  inputPlaceName, inputPlaceSrc, popupFullCard, imageFullCard, captionFullCard, closeFullCardBtn,
  closeButtons, popupList, config
}