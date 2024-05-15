export { createCard, deleteCard, likeCard};
import { deleteCardServer, addLikeCounter, deleteLikeCounter} from "./api.js"
import { openPopup, closePopup } from "./modal.js";

//Шаблон карточки для добавления в DOM
const cardTemplate = document.querySelector('#card-template').content;
const popupDelete = document.querySelector('.popup_type_delete');
const cardDeleteAck = popupDelete.querySelector(".popup__button");

//Удаление карточки
let cardToDeleteId;
let cardToDelete;

function deleteCard(evt, cardId) {
    openPopup(popupDelete);
    cardToDeleteId = cardId;
    cardToDelete = evt.target.closest('.card');
}

cardDeleteAck.addEventListener('click', () => {
    deleteCardServer(cardToDeleteId)
        .then(() => {
            cardToDelete.remove();
            closePopup(popupDelete);
        })
        .catch((err) => console.log(err))
});

//Добавить или удалить лайк карточке
function likeCard(evt, cardId) {
    const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? 
    deleteLikeCounter : addLikeCounter;
        likeMethod(cardId) 
            .then((res) => {
                evt.target.classList.toggle('card__like-button_is-active'); 
                evt.target.nextElementSibling.textContent = res.likes.length;
            })
            .catch(err => console.log(err));
}

//Создание карточки
function createCard(item, openImageCard, deleteCard, likeCard, currentUserId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.like__counter');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    cardImage.addEventListener('click', openImageCard);
    
    likeCounter.textContent = item.likes.length;
    if (item.likes.some(item => item._id === currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', (evt) => {
        likeCard(evt, item._id)
    });

    if (currentUserId !== item.owner._id) {
        deleteButton.remove();
    }else {
        deleteButton.addEventListener('click', (evt) => {
            deleteCard(evt, item._id);
        });
    }   

    return cardElement;
}



    