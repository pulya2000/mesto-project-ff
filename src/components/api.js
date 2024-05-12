const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
    headers: {
      authorization: '137db2d5-5143-4b6c-a884-5f1ed3213eae',
      'Content-Type': 'application/json'
    }
}

//Проверка ответа
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
   // console.log(res.text())
    return Promise.reject(`Ошибка: ${res.status}`);
};

//Получаем информацию о пользователе
export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => checkResponse(res));
};

//Получаем информацию о карточках
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then((res) => checkResponse(res))
};

//Обновление профиля
export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        'Content-Type' : 'application/json',
        body: JSON.stringify({
            name,
            about
        })
    })
    .then((res) => checkResponse(res));
};

//Добавление новой карточки
export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        'Content-Type' : 'application/json',
        body: JSON.stringify({
            name,
            link
        })
    })
    .then((res) => checkResponse(res));
};

//Удаление карточки
export const deleteCardServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => checkResponse(res));
};

//Добавление лайка
export const addLikeCounter = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => checkResponse(res));
};

//Удаление лайка
export const deleteLikeCounter = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => checkResponse(res));
};

//Замена аватара
export const changeAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        'Content-Type' : 'application/json',
        body: JSON.stringify({
            avatar
        })
    })
    .then((res) => checkResponse(res));
};