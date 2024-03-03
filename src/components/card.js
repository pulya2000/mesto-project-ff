export { createCard, deleteCard, isLiked};

//Шаблон карточки для добавления в DOM
const cardTemplate = document.querySelector('#card-template').content;

//Удаление карточки со страницы
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

//Лайк карточки
function isLiked(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

//Создание карточки
function createCard(item, callbacks) {

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
        
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', callbacks.deleteCard);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', callbacks.isLiked);

    cardImage.addEventListener('click', callbacks.openImageCard);

    return cardElement;
}



    