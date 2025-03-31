export default class Card {
  constructor(
    { name, link, _id, likes = [], userId, ownerId, isLiked },
    cardSelector,
    handleCardImageClick,
    handleDeleteCard,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes || [];
    this._userId = userId;
    this._ownerId = ownerId;
    this._cardSelector = cardSelector;
    this._handleCardImageClick = handleCardImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._isLikedState = isLiked;
  }

  _isLiked() {
    return this._isLikedState;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // ".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._cardElement);
      });

    this._imageElement.addEventListener("click", () => {
      this._handleCardImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon() {
    this._handleLikeClick(this._id, this._isLikedState)
      .then((updatedCard) => {
        console.log("Full updated card data:", updatedCard); // Let's see the complete response
        if (updatedCard) {
          this._isLikedState = updatedCard.isLiked;
          // Keep the existing likes if the API doesn't provide new ones
          if (updatedCard.likes) {
            this._likes = updatedCard.likes;
          }
          this._updateLikeButton();
        }
      })
      .catch((err) => console.log(`Error updating like: ${err}`));
  }

  _updateLikeButton() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const likeCount = this._cardElement.querySelector(".card__like-count");

    if (this._isLikedState) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }

    // For now, we'll just show 1 if liked, 0 if not liked
    likeCount.textContent = this._isLikedState ? 1 : 0;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement.dataset.cardId = this._id;
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._textElement = this._cardElement.querySelector(".card__title");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._textElement.textContent = this._name;
    this._setEventListeners();
    this._updateLikeButton();
    return this._cardElement;
  }
}
