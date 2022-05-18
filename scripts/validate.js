const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, settings) => {
 
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((item) => {
    return !item.validity.valid;
  })
};

const toggleButtonState = (inputList, inputSubmit, settings) => {
  if (hasInvalidInput(inputList)) {
    inputSubmit.classList.add(settings.inactiveButtonClass);
  } else {
    inputSubmit.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const inputSubmit = formElement.querySelector(settings.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, inputSubmit, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});