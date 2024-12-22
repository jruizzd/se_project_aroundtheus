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

  _checkInputValidity() {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (inputElement.validity.valid) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    } else {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  }

  _toggleSubmitButton() {
    const hasInvalidInput = this._inputList.some(
      (input) => !input.validity.valid
    );
    if (hasInvalidInput) {
      this._submitButton.disabled = true;
    } else {
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (event) =>
      event.preventDefault()
    );
    this._setEventListeners();
    this._toggleSubmitButton();
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      const errorElement = this._formElement.querySelector(
        `#${input.id}-error`
      );
      input.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    });
    this._toggleSubmitButton();
  }
}
