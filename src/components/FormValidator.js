export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(
      settings.submitButtonSelector
    );
    this._inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
  }

  _hideInputError(inputElement, errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._settings.errorClass);
      inputElement.classList.add(this._settings.inputErrorClass);
    }
  }

  toggleSubmitButton() {
    const hasInvalidInput = this._inputList.some(
      (input) => !input.validity.valid
    );
    if (hasInvalidInput) {
      this._submitButton.disabled = true;
      //add the class to your submit button to make it look disabled
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      //remove the class to your submit button to make it look enabled
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleSubmitButton();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (event) =>
      event.preventDefault()
    );
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      const errorElement = this._formElement.querySelector(
        `#${input.id}-error`
      );
      this._hideInputError(input, errorElement);
    });
    this.toggleSubmitButton();
  }
}

// this._inputList = [name input element, description input element]
