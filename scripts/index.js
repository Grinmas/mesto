const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');
const popupNameInput = document.querySelector('.popup__input_el_firstname');
const popupJobInput = document.querySelector('.popup__input_el_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const closeAddCard =document.querySelector('.popup__close-add-card')

function openPopup() {
  popup.classList.add('popup_opened');
  popupNameInput.value = profileTitle.textContent;
  popupJobInput.value = profileSubtitle.textContent;
}

function openAddCard() {
  popupAddCard.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  const valueNameInput = popupNameInput.value;
  const valueJobInput = popupJobInput.value;
  
  profileTitle.textContent = valueNameInput;
  profileSubtitle.textContent =  valueJobInput;
  closePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


profileAddButton.addEventListener('click', openAddCard);
closeAddCard.addEventListener('click', closePopupAddCard);


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

const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template').content;
const formAddCard = document.querySelector('.popup__form_add-card');
const inputPlaceName = document.querySelector('.popup__input_el_place-name');
const inputPlaceSrc = document.querySelector('.popup__input_el_place-src');
const popupFullCard = document.querySelector('.popup_full-card')

initialCards.forEach(function(item) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  placeElement.querySelector('.place__image').src = item.link;
  placeElement.querySelector('.place__title').textContent = item.name;
  places.append(placeElement);
  const placeButton = placeElement.querySelector('.place__button');
  placeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__button_active');
  });

  const placeDeleteButton = placeElement.querySelector('.place__delete-button');
  placeDeleteButton.addEventListener('click', function (evt) {
    placeElement.remove();
  });

  const placeImage = placeElement.querySelector('.place__image');
  placeImage.addEventListener('click', function (evt) {
   popupFullCard.classList.add('popup_opened');
   popupFullCard.querySelector('.popup__image').src = item.link;
   popupFullCard.querySelector('.popup__caption').textContent = item.name;
  });
});

popupFullCard.querySelector('.popup__close-button').addEventListener('click', function (evt) {
  popupFullCard.classList.remove('popup_opened');
})

function addCard (evt) {
  evt.preventDefault();
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeTitle = placeElement.querySelector('.place__title');
  const placeImage = placeElement.querySelector('.place__image');
  placeTitle.textContent = inputPlaceName.value;
  placeImage.src = inputPlaceSrc.value;
  places.prepend(placeElement);
  const placeButton = placeElement.querySelector('.place__button');
  placeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__button_active');
  });
  const placeDeleteButton = placeElement.querySelector('.place__delete-button');
  placeDeleteButton.addEventListener('click', function (evt) {
    placeElement.remove();
  });

  placeImage.addEventListener('click', function (evt) {
   popupFullCard.classList.add('popup_opened');
   popupFullCard.querySelector('.popup__image').src = placeImage.src;
   popupFullCard.querySelector('.popup__caption').textContent = placeTitle.textContent;
  });
  closePopupAddCard();
  inputPlaceName.value = '';
  inputPlaceSrc.value = '';
}

formAddCard.addEventListener('submit', addCard);
