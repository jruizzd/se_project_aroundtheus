// Parent class of PopupWithForm

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose;
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose() {
    // listens for esc button
    if (evt.key === "Escape") {
      const modalOpened = document.querySelector(".modal_opened");
      closeModal(modalOpened);
    }
  }
  setEventListeners() {
    // sets event listeners
  }
}
