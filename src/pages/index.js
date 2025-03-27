import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { formSettings } from "../utils/constants.js";
import Api from "../components/Api.js";
import "../pages/index.css";

// Card.js and Validator.js

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
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

// cardInstance.init();
// Handle profile modal opening and form resetting

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "106a4ee2-1a86-4403-8374-54ef205a87e1",
    "Content-Type": "application/json",
  },
});

let cardSection;

// getting the cards on the server
api
  .getInitialCards()
  .then((cards) => {
    // we want to display the cards from the server on our page
    cardSection = new Section(
      {
        items: cards.reverse(),
        renderer: renderCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

// call the getUserInfo method, to get the current user's name, description, etc...
// and then, display their name and description on the page
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
  })
  .catch((err) => console.error(err));

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

// Creating instance for UserInfo.js
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// const userInfoData = userInfo.getUserInfo();
// newCardPopup.close();
// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");

//Buttons and other DOM nodes
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
  api
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

const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

function handleCardImageClick({ name, link }) {
  popupWithImage.open({ name, link });
}

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

// making a request to server
// fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//   headers: {
//     authorization: "106a4ee2-1a86-4403-8374-54ef205a87e1",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });
