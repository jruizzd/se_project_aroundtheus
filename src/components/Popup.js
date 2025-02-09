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

  _handleEscClose = (e) => {
    // listens for esc button
    if (e.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    // sets event listeners
    this._popupElement.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal__close") ||
        e.target.classList.contains("modal_opened")
      ) {
        this.close();
      }
    });
  }
}
