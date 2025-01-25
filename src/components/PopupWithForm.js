// child class of Popup.js

import Popup from "./Popup.js";

// inherits a class
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    // super refers to parents' class
    super.close();
  }

  _getInputValues() {}
}
