import { FormValidation } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js"
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import "../pages/index.css";
import {popupProfile, avatarImage, editButton, avatarEditButton, profileCloseBtn,
  profileForm, popupNameInput, popupJobInput, profileTitle, profileSubtitle, profileAddButton,
  popupCardAdd, submitButton, closeAddCard, places, placeTemplate, place, formAddCard, formAvatar,
  inputPlaceName, inputPlaceSrc, popupFullCard, imageFullCard, captionFullCard, closeFullCardBtn,
  closeButtons, popupList, config} from "../scripts/utils/constants.js";


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: 'b1c0c7c0-f429-4086-b768-b1c2b9d713ec',
    'Content-Type': 'application/json'
  }
});

Promise.resolve(api.getInitialCards())
  .then((initialCards) => {
    cardsList.renderItems(initialCards);    
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  },
}, places);

let userId

api.getUserInfoServer()
  .then((userInfoServer) => {
    userInfo.setUserInfoServer(userInfoServer);
    userId = userInfoServer._id;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const profilePopupEdit = new PopupWithForm ({
  popupSelector: '.profile-popup',
  handleFormSubmit: (userData) => {
    profilePopupEdit.loading(true)
    api.editUserInfo(userData)
      .then(() => {
        userInfo.setUserInfo(userData);
        profilePopupEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        profilePopupEdit.loading(false);
      });
  }
});
profilePopupEdit.setEventListeners();

const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__subtitle',
  avatar: '.profile__avatar'
})

editButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupNameInput.value = info.username;
  popupJobInput.value = info.job;
  profilePopupEdit.open();
  formValidators[ profileForm.getAttribute('name') ].resetValidation();
})

avatarEditButton.addEventListener('click', () => {
  popupAvatarEdit.open();
  formValidators[ formAvatar.getAttribute('name') ].resetValidation();
})

const popupAvatarEdit = new PopupWithForm ({
  popupSelector: '.popup_avatar',
  handleFormSubmit: (formData) => {
    popupAvatarEdit.loading(true)
    api.setUserAvatarServer(formData)
      .then(() => {
        avatarImage.src = formData.link;
        popupAvatarEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatarEdit.loading(false);
      });
  }
})
popupAvatarEdit.setEventListeners();


profileAddButton.addEventListener('click', () => {
  popupAddCard.open();
  formValidators[ formAddCard.getAttribute('name') ].resetValidation();
})

const popupAddCard = new PopupWithForm ({
  popupSelector: '.popup_add-card',
  handleFormSubmit: (formData) => {
    popupAddCard.loading(true);
    api.addCardServer(formData)
      .then((formData) => {
        const cardElement = createCard(formData);
        cardsList.addItem(cardElement);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddCard.loading(false);
      });
  }
})
popupAddCard.setEventListeners();

const viewFullCard = new PopupWithImage('.popup_full-card');
viewFullCard.setEventListeners();


function handleCardClick(name, link) {
  imageFullCard.src = link;
  imageFullCard.alt = name;
  captionFullCard.textContent = name;
  viewFullCard.open({name, link})
}

const popupConfirmDelete = new PopupWithConfirmation ({
  popupSelector: '.popup_confirm-delete'
})
popupConfirmDelete.setEventListeners()

function createCard(item) {
  const userCard = new Card(
  item,
  '#place-template',
  handleCardClick,
  function handleSetLike(cardId) {
    api.setLikeServer(cardId)
      .then((data) => {
        userCard.handleLikeBtn(data);    
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, 
  function handleDeleteLike(cardId) {
    api.deleteLikeServer(cardId)
      .then((data) => {
        userCard.handleLikeBtn(data); 
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  },
  function handleDeleteClick(cardId) {
    popupConfirmDelete.open();
    popupConfirmDelete.submitCallback(() => {
      api.deleteCardServer(cardId)
        .then(() => {
          userCard.deleteCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }); 
  },
  userId);
  const cardElement = userCard.generateCard();

  return cardElement
}

//Валидация форм:

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
