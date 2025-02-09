import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
// Card.js and Validator.js

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  return card.getView();
}

const formSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  errorClass: "modal__error",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
};

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

const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
cardSection.renderItems();
// Template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
// Creating instance for PopupWithForm.js
const newCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {});
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

// userInfo.setUserInfo("John", "Sailor");
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
  userInfo.setUserInfo(inputValues.name, inputValues.job);
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(inputValues) {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  closeModal(addCardModal);
  cardFormElement.reset();
  cardFormValidator.toggleSubmitButton();
}

const popupWithImage = new PopupWithImage("#preview-image-modal");

function handleCardImageClick({ name, link }) {
  popupWithImage.open({ name, link });
}

// Escape and Overlay
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalOverlay);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}
function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// Form Listeners
previewImageModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  // call the getUserInfo method
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;

  editProfilePopup.open();
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);
// add new card
addNewCardButton.addEventListener("click", () => newCardPopup.open());
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
//initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
