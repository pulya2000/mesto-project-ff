export { creatCard, deleteCard, isLiked};

//Шаблон карточки для добавления в DOM
const cardTemplate = document.querySelector('#card-template').content;

//Удаление карточки со страницы
function deleteCard(evt) {
    evt.target.closest('.card').remove();
    console.log(evt.target.closest('.card'));
}

//Лайк карточки
function isLiked(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
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