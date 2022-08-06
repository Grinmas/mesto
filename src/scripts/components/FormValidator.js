class FormValidation {
  constructor(config, formElement) {
    this._formElement = formElement;

    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputSubmit = this._formElement.querySelector(this._submitButtonSelector);
  }
  
  _showInputError = (inputElement, errorMessage) => {
    const _errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(this._inputErrorClass);
    _errorElement.textContent = errorMessage;
    _errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const _errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove(this._inputErrorClass);
    _errorElement.classList.remove(this._errorClass);
    _errorElement.textContent = '';
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput () {
    return this._inputList.some((item) => {
      return !item.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._inputSubmit.classList.add(this._inactiveButtonClass);
      this._inputSubmit.setAttribute('disabled', true);
    } else {
      this._inputSubmit.classList.remove(this._inactiveButtonClass);
      this._inputSubmit.removeAttribute('disabled');
    }
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    /*this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.resetValidation()
    });*/
    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement)
    });
  }
}

export {FormValidation}
