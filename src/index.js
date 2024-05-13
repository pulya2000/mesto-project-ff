// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './pages/index.css';
//import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js'
import {enableValidation, clearValidation} from './components/validation.js';
import { getUserInfo,
         getInitialCards,
         updateUserInfo,
         addNewCard,
         changeAvatar
 } from './components/api.js';

const cardList = document.querySelector('.places__list');

//Изображение карточки
const popupImage = document.querySelector('.popup_type_image');
const popupImageCurrent = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

//Редактирование профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
const openEditButton = document.querySelector('.profile__edit-button');

//Добавление карточки
const popupAddCard = document.querySelector('.popup_type_new-card');
const openAddCardButton = document.querySelector('.profile__add-button');

//Форма редактирования профиля
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm['name'];
const jobInput = editProfileForm['description'];
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const formEditButton = editProfileForm.querySelector('.popup__button');

//Форма редактирования аватара
const avatarForm = document.forms['edit-avatar'];
const editAvatar = avatarForm['avatar-link'];
const openAvatarButton = document.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const formAvatarButton = avatarForm.querySelector('.popup__button');

//Форма добавления карточки
const addForm = document.forms['new-place'];
const placeInput = addForm.elements['place-name'];
const linkInput = addForm['link'];
const formAddButton = addForm.querySelector('.popup__button');

const callbacks = {deleteCard, likeCard, openImageCard}

const data = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

//Добавление карточек
function renderCard(item, userId, method = 'append') {
    const cardElement = createCard(
        item, callbacks, userId
    );
    cardList[method](cardElement);
}

//Показываем процесс сохранения изменений
function renderLoading(isLoading, button) {
        if (isLoading) {
            button.textContent = 'Сохранение...'
        }else {
            button.textContent = 'Сохранить'
        }
}

//Загрузка данных о пользователе и карточках с сервера
const loadCardsUsers = () =>
    Promise.all([getUserInfo(), getInitialCards()])
        .then(([userData, cardsData]) => {
            profileTitle.textContent = userData.name;
            profileJob.textContent = userData.about;
            profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
            cardsData.forEach(item => renderCard(item, userData._id));
    })

loadCardsUsers();

//Открытие изображения карточки
function openImageCard(evt) {
    popupImageCurrent.src = evt.target.src;
    popupImageCurrent.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
    openPopup(popupImage);
}

//Обработчик кнопки редактирования профиля
openEditButton.addEventListener('click', function(evt) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(editProfileForm, data);
    openPopup(popupEditProfile);
});

//Обработчик кнопки добавления карточки
openAddCardButton.addEventListener('click', function(evt) {
    addForm.reset();
    clearValidation(addForm, data);
    openPopup(popupAddCard);
});

//Обработчик кнопки редактирования аватара
openAvatarButton.addEventListener('click', function(evt) {
    clearValidation(avatarForm, data);
    openPopup(popupEditAvatar);
    avatarForm.reset();
});

//Редактирование профиля
function handleEditProfileForm(evt) {
    evt.preventDefault();
    renderLoading(true, formEditButton);
    updateUserInfo(nameInput.value, jobInput.value)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileJob.textContent = res.about;
            closePopup(popupEditProfile);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, formEditButton);
        })
}

//Обработчик формы редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileForm);


//Добавление новой карточки
function handleAddCardForm(evt) {
    evt.preventDefault();
    renderLoading(true, formAddButton);
      addNewCard(placeInput.value, linkInput.value)
      .then((res) => {
          renderCard(res, res.owner._id, 'prepend');
      })
      .catch((err) => console.log(err))
      .finally(() => {
          renderLoading(false, formAddButton);
      })
      closePopup(popupAddCard);
}

//Обработчик формы добавления карточки
addForm.addEventListener('submit', handleAddCardForm);

//Редактрование аватара
function handleAvatarForm(evt) {
    evt.preventDefault();
    renderLoading(true, formAvatarButton);
    changeAvatar(editAvatar.value)
        .then((res) => {
            profileAvatar.style.backgroundImage = `url(${res.avatar})`;
            closePopup(popupEditAvatar);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, formAvatarButton);
        })
}

//Обработчик формы редактирования аватара
avatarForm.addEventListener('submit', handleAvatarForm);

enableValidation(data);

