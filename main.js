(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-9",headers:{authorization:"137db2d5-5143-4b6c-a884-5f1ed3213eae","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))},o=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))};function c(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),document.addEventListener("keydown",i),e.addEventListener("click",u),e.addEventListener("click",l)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),e.removeEventListener("click",u),e.removeEventListener("click",l)}function i(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))}function u(e){e.target.closest(".popup__content")||a(e.currentTarget)}function l(e){e.target.classList.contains("popup__close")&&a(e.currentTarget)}document.querySelector(".popup_is-opened");var s=document.querySelector("#card-template").content,d=document.querySelector(".popup_type_delete"),p=d.querySelector(".popup__button");function f(e,t){c(d);var r=e.target.closest(".card");p.addEventListener("click",(function(){p.textContent="Удаление...",n(t).then((function(){r.remove(),a(d)})).catch((function(e){return console.log(e)})).finally(p.textContent="Да")}))}var m=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},_=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},v=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);_(n,r,t),n.forEach((function(n){m(e,n,t)}))};function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var h=document.querySelector(".places__list"),b=document.querySelector(".popup_type_image"),S=document.querySelector(".popup__image"),g=document.querySelector(".popup__caption"),C=document.querySelector(".popup_type_edit"),k=document.querySelector(".profile__edit-button"),L=document.querySelector(".popup_type_new-card"),E=document.querySelector(".profile__add-button"),q=document.forms["edit-profile"],x=q.name,A=q.description,T=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),w=document.querySelector(".profile__image"),U=q.querySelector(".popup__button"),O=document.forms["edit-avatar"],I=O["avatar-link"],B=document.querySelector(".profile__image"),D=document.querySelector(".popup_type_avatar"),P=O.querySelector(".popup__button"),M=document.forms["new-place"],N=M.elements["place-name"],J=M.link,H=M.querySelector(".popup__button"),V={deleteCard:f,likeCard:function(e,t){e.target.classList.contains("card__like-button_is-active")?o(t).then((function(t){e.target.classList.remove("card__like-button_is-active"),e.target.nextElementSibling.textContent=t.likes.length})):r(t).then((function(t){e.target.classList.add("card__like-button_is-active"),e.target.nextElementSibling.textContent=t.likes.length}))},openImageCard:function(e){S.src=e.target.src,S.alt=e.target.alt,g.textContent=e.target.alt,c(b)}},z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function $(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"append",c=function(e,t,n){var c=s.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),u=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),d=c.querySelector(".like__counter");return a.src=e.link,a.alt=e.name,i.textContent=e.name,a.addEventListener("click",t.openImageCard),d.textContent=e.likes.length,e.likes.some((function(e){return e._id===n}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){l.classList.contains("card__like-button_is-active")?o(e._id).then((function(e){d.textContent=e.likes.length,l.classList.remove("card__like-button_is-active")})):r(e._id).then((function(e){d.textContent=e.likes.length,l.classList.add("card__like-button_is-active")}))})),n!==e.owner._id&&u.remove(),u.addEventListener("click",(function(t){f(t,e._id)})),c}(e,V,t);h[n](c)}function F(e,t){t.textContent=e?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];T.textContent=o.name,j.textContent=o.about,w.style.backgroundImage="url(".concat(o.avatar,")"),c.forEach((function(e){return $(e,o._id)}))})),k.addEventListener("click",(function(e){x.value=T.textContent,A.value=j.textContent,v(q,z),c(C)})),E.addEventListener("click",(function(e){M.reset(),v(M,z),c(L)})),B.addEventListener("click",(function(e){v(O,z),c(D),O.reset()})),q.addEventListener("submit",(function(n){var r,o;n.preventDefault(),F(!0,U),(r=x.value,o=A.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,"Content-Type":"application/json",body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){T.textContent=e.name,j.textContent=e.about,a(C)})).catch((function(e){return console.log(e)})).finally((function(){F(!1,U)}))})),M.addEventListener("submit",(function(n){var r,o;n.preventDefault(),F(!0,H),(r=N.value,o=J.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,"Content-Type":"application/json",body:JSON.stringify({name:r,link:o})}).then((function(e){return t(e)}))).then((function(e){$(e,e.owner._id,"prepend")})).catch((function(e){return console.log(e)})).finally((function(){F(!1,H)})),a(L)})),O.addEventListener("submit",(function(n){var r;n.preventDefault(),F(!0,P),(r=I.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,"Content-Type":"application/json",body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){w.style.backgroundImage="url(".concat(e.avatar,")"),a(D)})).catch((function(e){return console.log(e)})).finally((function(){F(!1,P)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);_(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?m(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),_(n,r,t)}))}))}(t,e)}))}(z)})();