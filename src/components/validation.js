
//Добавление класса с ошбкой
const showInputError = (formElement, inputElement, errorMessage, data) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(data.errorClass);
}

//Удаление класса с ошибкой
const hideInputError = (formElement, inputElement, data) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.errorClass);
    errorElement.textContent = '';
}

//Проверка валидации формы
const checkInputValidity = (formElement, inputElement, data) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, data);
    } else {
      hideInputError(formElement, inputElement, data);
    }
}

//Добавляем слушатели для формы и полей формы
const setEventListeners = (formElement, data) => {
  const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
  const buttonElement = formElement.querySelector(data.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, data);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, data);
      toggleButtonState(inputList, buttonElement, data);
    });
  });
}

//Проверяем все поля на валидацю
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Включаем или отключаем кнопку саюмита в зависимости от валидности полей
const toggleButtonState = (inputList, buttonElement, data) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(data.inactiveButtonClass);
  }else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(data.inactiveButtonClass);
  }
}

 //включаем валидацию формы и полей формы для каждой формы из списка форм. 
export const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, data);
  });
 }
 
export const clearValidation = (formElement, data) => {
  const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
  const buttonElement = formElement.querySelector(data.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, data);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, data);
  });
}