const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);



const popupForm = document.querySelector('.popup__form');
const popupNameInput = document.querySelector('.popup__name-input');
const popupJobInput = document.querySelector('.popup__job-input');

function formSubmitHandler (evt) {
  evt.preventDefault();
  const valueNameInput = popupNameInput.value;
  const valueJobInput = popupJobInput.value;
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  profileTitle.textContent = valueNameInput;
  profileSubtitle.textContent =  valueJobInput;
  closePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);