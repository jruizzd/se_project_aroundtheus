import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(
      ".modal__preview-img"
    );
    this._previewTitle = this._popupElement.querySelector(
      ".modal__preview-title"
    );
  }
  // data should be an object containing the name and link
  open({ name, link }) {
    // set the correct image
    this._previewImage.src = link;
    // set the correct caption
    this._previewTitle.textContent = name;
    // set the alt for the image
    this._previewImage.alt = name;
    // open preview image modal

    super.open();
  }
}
