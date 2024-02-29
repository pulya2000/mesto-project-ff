// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import {initialCards} from './cards.js'

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

//Редактирование профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
const openEditButton = document.querySelector('.profile__edit-button');

//Добавление карточки
const popupAddCard = document.querySelector('.popup_type_new-card');
const openAddCardButton = document.querySelector('.profile__add-button');

//Изображение карточки
const popupImage = document.querySelector('.popup_type_image');
const popupImageCurrent = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

//Форма редактирования профиля
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input[name="name"]');
const jobInput = document.querySelector('.popup__input[name="description"]');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

//Форма добавления карточки
const addForm = document.querySelector('.popup__form[name="new-place"]');
const placeInput = document.querySelector('.popup__input[name="place-name"]');
const linkInput = document.querySelector('.popup__input[name="link"]');

//Удаление карточки из массива и страницы
function deleteCard(evt) {
    evt.target.closest('.card').remove();
    console.log(evt.target.closest('.card'));
}

//Создание карточки
function creatCard(item, deleteCard, addLike, OpenImage) {

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', addLike);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', OpenImage);

    return cardElement;
}

//Добавление карточек на страницу
initialCards.forEach(item => {
    cardList.append(creatCard(item, deleteCard, isLiked, OpenImageCard))
});

//Лайк карточки
function isLiked(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

//Открытите попапов
function openPopup(popup) {
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', handleOverlayClose);
    popup.addEventListener('click', handleButtonClose);
}

//Открытие изображения карточки
function OpenImageCard(evt) {
    popupImageCurrent.src = evt.target.src;
    popupImageCurrent.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
    openPopup(popupImage);
}

//Закрытие попапов
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('click', handleOverlayClose);
    popup.removeEventListener('click', handleButtonClose);
}

//Закрытие попапов по нажатию ESC
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

//Закрытие попапов по клику на оверлей
function handleOverlayClose(evt) {
    if (!evt.target.closest('.popup__content')) {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

//Закрытие попапов по клику на крестик в заголовке попапа
function handleButtonClose(evt) {
    if (evt.target.classList.contains('popup__close')) {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
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

//Добавление карточки
function handleAddForm(evt) {
    evt.preventDefault();
    const cardElement = creatCard(
        {name: placeInput.value,
         link: linkInput.value}, 
        deleteCard,
        isLiked, 
        OpenImageCard
    );
    cardList.prepend(cardElement);
    addForm.reset();
    closePopup(popupAddCard);
}

//Обработчик формы добавления карточки
addForm.addEventListener('submit', handleAddForm);

