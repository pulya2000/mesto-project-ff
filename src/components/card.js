export { createCard, deleteCard, likeCard};
import { deleteCardServer, addLikeCounter, deleteLikeCounter} from "./api.js"
import { openPopup, closePopup } from "./modal.js";

//Шаблон карточки для добавления в DOM
const cardTemplate = document.querySelector('#card-template').content;
const popupDelete = document.querySelector('.popup_type_delete');
const cardDeleteAck = popupDelete.querySelector(".popup__button");

//Удаление карточки со страницы
function deleteCard(evt, cardId) {
    openPopup(popupDelete);
    const cardForDelete = evt.target.closest('.card');
    cardDeleteAck.addEventListener('click', () => {
        cardDeleteAck.textContent = 'Удаление...';
        deleteCardServer(cardId)
            .then(() => {
                cardForDelete.remove();
                closePopup(popupDelete);
            })
            .catch((err) => console.log(err))
            .finally(cardDeleteAck.textContent = 'Да');
    })
}

//Добавить или удалить лайк карточке
function likeCard(evt, cardId) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
        deleteLikeCounter(cardId)
            .then((res) => {
                evt.target.classList.remove('card__like-button_is-active');
                evt.target.nextElementSibling.textContent = res.likes.length;
            })
    } else {
        addLikeCounter(cardId)
            .then((res) => {
                evt.target.classList.add('card__like-button_is-active');
                evt.target.nextElementSibling.textContent = res.likes.length;
            })
    }
}

//Создание карточки
function createCard(item, callbacks, currentUserId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.like__counter');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    cardImage.addEventListener('click', callbacks.openImageCard);
    
    likeCounter.textContent = item.likes.length;
    if (item.likes.some(item => item._id === currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            deleteLikeCounter(item._id)
                .then((res) => {
                    likeCounter.textContent = res.likes.length;
                    likeButton.classList.remove('card__like-button_is-active');
                })
        } else {
            addLikeCounter(item._id)
                .then((res) => {
                    likeCounter.textContent = res.likes.length;
                    likeButton.classList.add('card__like-button_is-active');
                })
        }
    });

    if (currentUserId !== item.owner._id) {
        deleteButton.remove();
    }   
    
    deleteButton.addEventListener('click', (evt) => {
        deleteCard(evt, item._id);
    });

    return cardElement;
}



    