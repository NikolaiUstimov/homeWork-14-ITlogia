//Функция полной загрузки страницы
window.onload = function () {
    "use strict";

    //Функция создания HTML элемента
    function newHTMLElement(tag, text, className) {
        let element = document.createElement(tag);
        element.textContent = text;
        element.classList.add(className);
        return element;
    }

    //Функция удаления ошибок
    function removeError() {
        let errorText = document.querySelectorAll('.text-error');
        for (let i = 0; i < errorText.length; i++) {
            errorText[i].remove();
        }
    }

    //Взамодействие с кнопкой Sign Up
    const form = document.getElementById('form');
    const inputUserName = document.getElementById("username");
    const inputFullName = document.getElementById("fullName");
    const inputEmail = document.getElementById("email");
    const inputPass = document.getElementById("password");
    const inputPassRepeat = document.getElementById("repeatPassword");
    const inputCheckbox = document.getElementById("check");
    const btnSubmit = document.getElementById('btn');

    let validationResult = true;
    const arrValidText = [
        "Заполните поле",
        "Заполните в формате: Имя Фамилия",
        "Заполните, используя буквы, цифры, - или _ и не менее 2х символов",
        "Заполните в формате: name@mail.com/ru",
        "Заполните, используя: Aa!?-_$",
        "Пароли не совпадают",
        "Вы не согласны с условиями",
        "Такой пользователь не зарегистрирован",
        "Неверный пароль",
    ];

    function validation() {
        removeError();

        inputFullName.classList.remove("error");
        if (!inputFullName.value.match(/^[А-ЯЁA-Z][а-яёa-z]+\s[А-ЯЁA-Z][а-яёa-z]*$/)) {
            inputFullName.classList.add("error");
            inputFullName.parentElement.append(newHTMLElement('p', `${arrValidText[1]}`, 'text-error'));
            return;
        }

        inputUserName.classList.remove("error");
        if (!inputUserName.value.match(/^[А-ЯЁA-Zа-яёa-z][А-ЯЁA-Zа-яёa-z0-9-_\.]{1,20}$/)) {
            inputUserName.classList.add("error");
            inputUserName.parentElement.append(newHTMLElement('p', `${arrValidText[2]}`, 'text-error'));
            return;
        }

        inputEmail.classList.remove("error");
        if (!inputEmail.value.match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/)) {
            inputEmail.classList.add("error");
            inputEmail.parentElement.append(newHTMLElement('p', `${arrValidText[3]}`, 'text-error'));
            return;
        }

        inputPass.classList.remove("error");
        if (!inputPass.value.match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
            inputPass.classList.add("error");
            inputPass.parentElement.append(newHTMLElement('p', `${arrValidText[4]}`, 'text-error'));
            return;
        }

        inputPassRepeat.classList.remove("error");
        if (inputPassRepeat.value !== inputPass.value) {
            inputPassRepeat.classList.add("error");
            inputPassRepeat.parentElement.append(newHTMLElement('p', `${arrValidText[5]}`, 'text-error'));
            return;
        }

        if (!inputCheckbox.checked) {
            inputCheckbox.parentElement.parentElement.append(newHTMLElement('p', `${arrValidText[6]}`, 'text-error'));
            return;
        }

        return validationResult;
    }

    //Событие по нажатию на кнопку Sign Up
    function submit(event) {
        event.preventDefault();
        if (validation(this) === true) {
            document.getElementById('modal').classList.add("open");
            let objValueForm = {
                fullName: inputFullName.value,
                userName: inputUserName.value,
                email: inputEmail.value,
                password: inputPass.value,
            };

            let clientsArray = [];
            let storageUser = localStorage.getItem('newUser');
            if (storageUser) {
                clientsArray = JSON.parse(storageUser);
            }
            clientsArray.push(objValueForm);
            localStorage.setItem('newUser', JSON.stringify(clientsArray));

            form.reset();
            btnSubmit.removeEventListener('click', submit);
        }
    }
    btnSubmit.addEventListener('click', submit);


    //Событие по нажатию на кнопку OK и на ссылку после кнопки
    let formFullName = document.getElementById('form-input-full-name');
    let formEmail = document.getElementById('form-input-email');
    let formRepeatPass = document.getElementById('form-input-repeat-pass');
    let formCheckbox = document.getElementsByClassName('form-check')[0];
    let formTitle = document.getElementsByClassName('form-title')[0];
    let formDesc = document.getElementsByClassName('form-desc')[0];
    let linkHaveAccount = document.getElementById('link-account');


    //Функция для удаления и изменения элементов
    function removeElements() {
        formFullName.remove();
        formEmail.remove();
        formRepeatPass.remove();
        formCheckbox.remove();
    }

    //Функция замены текста на элементе
    function changeElements(element, text) {
        element.innerText = text;
    }

    //Клик по ссылке "Already have an account?"
    function clickLink() {
        removeElements();
        changeElements(btnSubmit, "Sign in");
        changeElements(formTitle, "Log in to the system");
        changeElements(linkHaveAccount, "Registration");
        //Перезаписываю событие 'submit'
        btnSubmit.removeEventListener('click', submit);
        btnSubmit.addEventListener('click', submitSignIn);
    }
    linkHaveAccount.addEventListener('click', clickLink);

    //Клик по ссылке "Registration"
    function clickLinkNew() {
        linkHaveAccount.removeEventListener('click', clickLink);
        linkHaveAccount.onclick = function () {
            location.reload();
        }
    }
    linkHaveAccount.addEventListener('click', clickLinkNew);

    //Клик по кнопке ОК модального окна
    document.getElementById('modal-btn').onclick = function () {
        document.getElementById('modal').classList.remove("open");

        inputCheckbox.checked = false;
        removeElements();
        changeElements(btnSubmit, "Sign in");
        changeElements(formTitle, "Log in to the system");
        changeElements(linkHaveAccount, "Registration");
        //Перезаписываю событие 'submit'
        btnSubmit.removeEventListener('click', submit);
        btnSubmit.addEventListener('click', submitSignIn);
        clickLinkNew();
    }

    //Валидация формы входа (после нажатия на кнопку ОК или перехода по ссылке "Already have an account?")
    function validationSignIn() {
        removeError();

        inputUserName.classList.remove("error");
        if (!inputUserName.value.match(/^[А-ЯЁA-Zа-яёa-z][А-ЯЁA-Zа-яёa-z0-9-_\.]{1,20}$/)) {
            inputUserName.classList.add("error");
            inputUserName.parentElement.append(newHTMLElement('p', `${arrValidText[2]}`, 'text-error'));
            return;
        }

        inputPass.classList.remove("error");
        if (!inputPass.value.match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
            inputPass.classList.add("error");
            inputPass.parentElement.append(newHTMLElement('p', `${arrValidText[4]}`, 'text-error'));
            return;
        }

        return validationResult;
    }

    //Событие по нажатию на кнопку Sign in
    function submitSignIn(event) {
        event.preventDefault();
        if (validationSignIn(this) === true) {
            let userArr = JSON.parse(localStorage.getItem('newUser'));

            let user = null;
            removeError();
            for (let i = 0; i < userArr.length; i++) {
                if (userArr[i].userName === inputUserName.value) {
                    user = userArr[i];
                }
            }
            console.log(user)
            console.log(inputUserName.value)
            console.log(inputPass.value)

            if (user === null) {
                inputUserName.classList.add("error");
                inputUserName.parentElement.append(newHTMLElement('p', `${arrValidText[7]}`, 'text-error'));
            } else if (user.password !== inputPass.value) {
                inputPass.classList.add("error");
                inputPass.parentElement.append(newHTMLElement('p', `${arrValidText[8]}`, 'text-error'));
            } else {
                changeElements(formTitle, `Welcome, ${user.fullName}`);
                formTitle.style.marginBottom = '20px';
                formTitle.style.textAlign = 'center';
                changeElements(btnSubmit, `Exit`);
                inputUserName.parentElement.remove();
                inputPass.parentElement.remove();
                linkHaveAccount.remove();
                formDesc.remove();
                form.reset();
            }
        }
    }

    //Клик по кнопке Exit
    btnSubmit.onclick = function () {
        if (btnSubmit.innerText === "Exit") {
            location.reload();
        }
    }

}