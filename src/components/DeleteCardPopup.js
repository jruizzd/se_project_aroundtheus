// The class extends Popup to inherit basic popup functionality
import Popup from "./Popup.js";

class DeleteCardPopup extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._cardToDelete = null;
  }

  // This method store which card you're trying to delete
  setCardToDelete(card) {
    this._cardToDelete = card;
  }

  //   This method handles the form submission
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardToDelete);
    });
  }
}

export default DeleteCardPopup;
