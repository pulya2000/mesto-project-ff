// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, isLiked} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js'

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

//Форма добавления карточки
const addForm = document.forms['new-place'];
const placeInput = addForm.elements['place-name'];
const linkInput = addForm['link'];

const callbacks = {deleteCard, isLiked, openImageCard}

//Добавление карточек
function renderCard(item, method = 'append') {
    const cardElement = createCard(
        item, callbacks
    );
    cardList[method](cardElement);
}

//Добавление карточек на страницу
initialCards.forEach(item => renderCard(item));

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
    openPopup(popupEditProfile);
});

//Обработчик кнопки добавления карточки
openAddCardButton.addEventListener('click', function(evt) {
    openPopup(popupAddCard);
})

//Редактирование профиля
function handleEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

//Обработчик формы редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileForm);

function handleAddForm(evt) {
    evt.preventDefault();
    renderCard({ name: placeInput.value,
                 link: linkInput.value },
                 'prepend'
              );
    addForm.reset();
    closePopup(popupAddCard);
}

//Обработчик формы добавления карточки
addForm.addEventListener('submit', handleAddForm);

