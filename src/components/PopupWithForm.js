// child class of Popup.js

import Popup from "./Popup.js";

// inherits a class
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputData = {};
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._submitButton.dataset.loadingText;
    } else {
      this._submitButton.textContent = this._submitButton.dataset.text;
    }
  }

  setEventListeners() {
    // sets event listeners
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      Promise.resolve(this._handleFormSubmit(this._getInputValues()))
        .then(() => {
          this.close();
        })
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }

  // collects data from all the input fields and returns it as an object. This data should then be passed to the submission handler as an argument.
  _getInputValues() {
    const inputData = {}; // Create a new object each time
    const inputElements = this._popupForm.querySelectorAll(".modal__input");
    inputElements.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }
}
