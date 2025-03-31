import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { formSettings } from "../utils/constants.js";
import Api from "../components/Api.js";
import DeleteCardPopup from "../components/DeleteCardPopup.js";
import "../pages/index.css";

let userId;

const handleLikeClick = (cardId, isLiked) => {
  const apiCall = isLiked ? api.removeLike(cardId) : api.addLike(cardId);

  return apiCall
    .then((updatedCard) => {
      console.log("Updated card data from API:", updatedCard);
      return updatedCard;
    })
    .catch((err) => {
      console.error("Error updating like:", err);
    });
};

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      _id: cardData._id,
      likes: cardData.likes,
      userId: userId,
      ownerId: cardData.owner._id,
    },
    "#card-template",
    handleCardImageClick,
    (cardElement) => {
      deleteCardPopup.setCardToDelete(cardElement);
      deleteCardPopup.open();
    },
    handleLikeClick
  );
  return card.getView();
}

// Select the form elements
const cardFormElement = document.querySelector("#add-card-form");
const profileFormElement = document.querySelector("#edit-profile-form");
// Create instances of FormValidator for both forms
const cardFormValidator = new FormValidator(formSettings, cardFormElement);
const profileFormValidator = new FormValidator(
  formSettings,
  profileFormElement
);

// enable form validation for both forms
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
const editAvatarForm = document.querySelector("#edit-avatar-form");
const editAvatarValidator = new FormValidator(formSettings, editAvatarForm);
editAvatarValidator.enableValidation();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "106a4ee2-1a86-4403-8374-54ef205a87e1",
    "Content-Type": "application/json",
  },
});

let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id; // Store the user ID
    userInfo.setUserInfo(userData.name, userData.about);
    cardSection = new Section(
      {
        items: cards.reverse(),
        renderer: renderCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.log(`Error: ${err}`));
// Template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
// Creating instance for PopupWithForm.js
const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarFormSubmit
);
editAvatarPopup.setEventListeners();

// Creating instance for UserInfo.js
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// const userInfoData = userInfo.getUserInfo();
// newCardPopup.close();
// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");

//Buttons and other DOM nodes
const avatarEditButton = document.querySelector(".profile__image-edit");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
// Form data
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = cardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = cardFormElement.querySelector(".modal__input_type_url");
const previewImageModal = document.querySelector("#preview-image-modal");
const modalPreviewImg = previewImageModal.querySelector(".modal__preview-img");
const modalPreviewTitle = previewImageModal.querySelector(
  ".modal__preview-title"
);
const previewImageModalCloseButton =
  previewImageModal.querySelector(".modal__close");

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

function handleProfileFormSubmit(inputValues) {
  // utilize the inputValues object
  // and call the setUserInfo method (in the UserInfo class) to set the name and description that was typed in by the user
  return api
    .editProfile({ name: inputValues.name, about: inputValues.description })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch(console.error);
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    console.error("Please enter a valid URL starting with http:// or https://");
    return;
  }
  api
    .addCard({
      name: name,
      link: link,
    })
    .then((newCard) => {
      renderCard(newCard);
      cardFormElement.reset();
      cardFormValidator.toggleSubmitButton();
    })
    .catch((err) => console.error(err));
}

function handleAvatarFormSubmit(inputValues) {
  return api
    .editAvatar(inputValues.avatar)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
    })
    .catch(console.error);
}

const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

function handleCardImageClick({ name, link }) {
  popupWithImage.open({ name, link });
}
// An instance for DeleteCardPopup
const deleteCardPopup = new DeleteCardPopup({
  popupSelector: "#delete-card-modal",
  handleFormSubmit: (cardElement) => {
    const cardId = cardElement.dataset.cardId;
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch((err) => console.log(err));
  },
});
// Add event listeners for the delete popup
deleteCardPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  // call the getUserInfo method
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileFormValidator.resetValidation();
  editProfilePopup.open();
});

// add new card
addNewCardButton.addEventListener("click", () => newCardPopup.open());

avatarEditButton.addEventListener("click", () => {
  editAvatarValidator.resetValidation();
  editAvatarPopup.open();
});
