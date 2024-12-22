export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //".card__like-button"
    const likeButton = this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // ".card__delete-button"
    const deleteButton = this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get the card view
    // set event listeners
    this._setEventListeners();
    // return the card
  }

  init() {
    // Create the card's HTML using template
    const cardTemplate = document.querySelector("#card-template");
    const cardElement = cardTemplate.content.cloneNode(true);

    // Set the card's title and image
    cardElement.querySelector(".card__title").textContent = this.title;
    cardElement.querySelector(".card__image").src = this.imageUrl;

    // Append the new card to the list of cards in the DOM
    document.querySelector(".cards__list").appendChild(cardElement);
  }
}
