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
const closeAddCard =document.querySelector('.popup__close-add-card');
const places = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template').content;
const place = placeTemplate.querySelector('.place');
const formAddCard = document.querySelector('.popup__form_add-card');
const inputPlaceName = document.querySelector('.popup__input_el_place-name');
const inputPlaceSrc = document.querySelector('.popup__input_el_place-src');
const popupFullCard = document.querySelector('.popup_full-card');
const closeFullCardBtn = popupFullCard.querySelector('.popup__close-button');


function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

profileCloseBtn.addEventListener('click', function () {
  closePopup(popupProfile);
});

profileAddButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});
closeAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

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

function createCard(item) {
  const cardElement = place.cloneNode(true);
  const placeImage = cardElement.querySelector('.place__image');
  const placeButton = cardElement.querySelector('.place__button');
  const placeDeleteBtn = cardElement.querySelector('.place__delete-button');
  const placeTitle = cardElement.querySelector('.place__title');
  placeImage.src = item.link;
  placeImage.alt = item.name;
  placeTitle.textContent = item.name;
  activatesLikeBtn(placeButton);
  deleteCard(placeDeleteBtn, cardElement);
  openFullCard (placeImage, placeTitle);
  return cardElement
};

function activatesLikeBtn (placeButton) {
  placeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__button_active');
  });
};

function deleteCard (placeDeleteBtn, cardElement) {
  placeDeleteBtn.addEventListener('click', function (evt) {
    cardElement.remove();
  });
};

function openFullCard (placeImage, placeTitle) {
  placeImage.addEventListener('click', function (evt) {
    const imageFullCard = popupFullCard.querySelector('.popup__image');
    const captionFullCard = popupFullCard.querySelector('.popup__caption');
    imageFullCard.src = placeImage.src;
    captionFullCard.textContent = placeTitle.textContent;
    openPopup(popupFullCard);
  });
};

initialCards.forEach(function(item) {
  const placeElement = createCard(item)
  places.append(placeElement);
});

closeFullCardBtn.addEventListener('click', function (evt) {
  closePopup(popupFullCard);
});

const userCards = [];

function addCard (evt) {
  evt.preventDefault();
  userCards.push(
    {name: inputPlaceName.value,
    link: inputPlaceSrc.value});
  userCards.forEach(function(item) {
    const placeElement = createCard(item)
    places.prepend(placeElement);
  });
  formAddCard.reset();
  closePopup(popupAddCard);
};
 
formAddCard.addEventListener('submit', addCard);
