// child class of Popup.js

import Popup from "./Popup.js";

// inherits a class
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputData = {};
  }

  setEventListeners() {
    // sets event listeners
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  // collects data from all the input fields and returns it as an object. This data should then be passed to the submission handler as an argument.
  _getInputValues() {
    const inputValues = this._popupForm.querySelectorAll(".modal__input");
    inputValues.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }
}
