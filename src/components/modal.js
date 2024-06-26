export {openPopup, closePopup};

const popupIsOpened = document.querySelector('.popup_is-opened');

//Открытите попапов
function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
        popup.classList.add('popup_is-opened');
    }, 1);
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', handleOverlayClose);
    popup.addEventListener('click', handleButtonClose);
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
        closePopup(evt.currentTarget);
    }
}

//Закрытие попапов по клику на крестик
function handleButtonClose(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    }
}

