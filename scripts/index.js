// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function deleteCard(listitem) {
    listitem.remove();
}

function creatCard(item, deleteCard) {

    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
        
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
        deleteCard(cardElement);
    })

    return cardElement;
}

initialCards.forEach(item => {
    cardList.append(creatCard(item, deleteCard))
});
