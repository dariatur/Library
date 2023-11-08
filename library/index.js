const burger = document.getElementById("burger");
const header = document.querySelector("header");
const links = document.querySelectorAll(".nav__item");
const main = document.querySelector("main");
const body = document.querySelector("body");
const navigation = document.querySelector(".header__navigation");

const button1 = document.querySelector(".first_button");
const button1_area = document.querySelector(".first_btn_area");

const button2 = document.querySelector(".second_button");
const button2_area = document.querySelector(".second_btn_area");

const button3 = document.querySelector(".third_button");
const button3_area = document.querySelector(".third_btn_area");

const button4 = document.querySelector(".fourth_button");
const button4_area = document.querySelector(".fourth_btn_area");

const button5 = document.querySelector(".fifth_button");
const button5_area = document.querySelector(".fifth_btn_area");

const image = document.querySelector(".about_image");
const sliderLine = document.querySelector(".slider_line");

const leftCarret = document.querySelector(".left_button");
const rightCarret = document.querySelector(".right_button");

let right_counter = 0;
let left_counter = 4;
let offset = 0;

const radioButtons = document.querySelectorAll(".season_input");
const winterBooks = document.querySelector(".books_winter");
const summerBooks = document.querySelector(".books_summer");
const autumnBooks = document.querySelector(".books_autumn");
const springBooks = document.querySelector(".books_spring");

const loginButton = document.querySelector(".login_button");
const registerButton = document.querySelector(".register_button");
const loginModal = document.querySelector(".login_window");
const registerModal = document.querySelector(".register_window");
const profileModal = document.querySelector(".modal_container_profile");
const closeLoginButton = document.querySelector(".login_close");
const closeRegisterButton = document.querySelector(".register_close");
const loginLink = document.querySelector(".login_link");
const registerLink = document.querySelector(".register_link");
const profileCloseButton = document.querySelector(".profile_close");
const copyNumberButton = document.querySelector(".copy_number_button");
const profileButton = document.querySelector(".profile_button");
const rentedBooksList = document.querySelector(".rented_books_list");
const bookNames = document.querySelectorAll(".book_name_author");

const registerForm = document.querySelector(".register_form");
const nameInput = document.getElementById("name_input_signup");
const surnameInput = document.getElementById("surname_input_signup");
const emailInput = document.getElementById("email_input_signup");
const passwordInput = document.getElementById("password_input_signup");
const user = {
    email: "",
    password: "",
    name: "",
    surname: "",
    cardNumber: 0,
    hasReaderCard: false,
    amountOfVisits: 0,
    bonuses: 1240,
    rentedBooks: []
};

const loginForm = document.querySelector(".login_form");
const emailOrNumberLogin = document.getElementById("email_or_number_input_login");
const passwordLogin = document.getElementById("password_input_login");

const iconButton = document.querySelector(".icon_button");
const dropMenu = document.querySelector(".drop_menu");
const dropLoginLink = document.querySelector(".drop_login_link");
const dropRegisterLink = document.querySelector(".drop_register_link");
const dropProfileLink = document.querySelector(".drop_profile_link");
const dropLogoutLink = document.querySelector(".drop_logout_link");

const buyButtons = document.querySelectorAll(".buy_button");
const buyCardModalWindow = document.querySelector(".modal_buy_card_container");
const buyCardCloseButton = document.querySelector(".buy_card_close");
const buyCardForm = document.querySelector(".buy_card_form");
const buyCardButton = document.querySelectorAll(".modal_button");
const bankCardInput =document.getElementById("input_bank_card_number");
const bankCardMonthInput = document.getElementById("input_bank_card_month");
const bankCardYearInput = document.getElementById("input_bank_card_year");
const bankCardCVCInput = document.getElementById("input_bank_card_cvc");
const cardholderNameInput = document.getElementById("input_buy_card_name");
const postalCodeInput = document.getElementById("input_buy_card_postal_code");
const cityInput = document.getElementById("input_buy_card_city");
let buyBookButton = undefined;

const checkCardFrom = document.querySelector(".form");

{
    body.classList.remove("preload");
    let activeUser = undefined;
    if (localStorage.getItem("active user")){
        activeUser = JSON.parse(localStorage.getItem("active user"));
        createProfileHTML(activeUser);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    burger.addEventListener("click", function () {
        header.classList.toggle("open");
        if (header.classList.contains("open")) {
            main.addEventListener("click", function () {
                header.classList.remove("open");
            })
        }
        dropMenu.classList.remove("open");
    })

    links.forEach(element => {
        element.addEventListener("click", function () {
            header.classList.toggle("open");
        })
    });

    button1_area.addEventListener("click", button1_click);
    button2_area.addEventListener("click", button2_click);
    button3_area.addEventListener("click", button3_click);
    button4_area.addEventListener("click", button4_click);
    button5_area.addEventListener("click", button5_click);

    leftCarret.addEventListener("click", function () {
        left_counter--;
        if (left_counter < 0) {
            left_counter = 0;
        }
        
        switch(left_counter){
            case 0: button1_click(); break;
            case 1: button2_click(); break;
            case 2: button3_click(); break;
            case 3: button4_click(); break;
            case 4: button5_click();
        }
    })

    rightCarret.addEventListener("click", function () {
        right_counter++;
        if (right_counter > 4) {
            right_counter = 4;
        }
        
        switch(right_counter){
            case 0: button1_click(); break;
            case 1: button2_click(); break;
            case 2: button3_click(); break;
            case 3: button4_click(); break;
            case 4: button5_click();
        }
    })

    window.addEventListener("resize", function () {
        if (this.window.innerWidth > 1024) {
            if (button2.classList.contains("colored")) {
                offset += (image.clientWidth + 25);
                if (offset > (image.clientWidth + 25) * 1) {
                    offset = image.clientWidth + 25;
                }
                sliderLine.style.left = -offset + "px";
            }

            if (button3.classList.contains("colored")) {
                offset += (image.clientWidth + 25) * 2;
                if (offset > (image.clientWidth + 25) * 2) {
                    offset = (image.clientWidth + 25) * 2;
                }
                sliderLine.style.left = -offset + "px";
            }

            if (button4.classList.contains("colored") || button5.classList.contains("colored")) {
                button1_click();
            }

        } else if(this.window.innerWidth<1025){
            if (button3.classList.contains("colored")) {
                button3_click();
            } else if (button2.classList.contains("colored")) {
                button2_click();
            }
        }
    })

    let timeOutWinter = undefined;
    let timeOutSpring = undefined;
    let timeOutSummer = undefined;
    let timeOutAutumn = undefined;
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener("change", event => {
            switch (event.target.value) {
                case "winter":
                    clearTimeout(timeOutSpring);
                    clearTimeout(timeOutSummer);
                    clearTimeout(timeOutAutumn);
                    timeOutWinter=setTimeout(() => {winterBooks.classList.remove("visuallyhidden");}, 700)
                    winterBooks.style.zIndex = "4";
                    springBooks.style.zIndex = "1";
                    summerBooks.style.zIndex = "1";
                    autumnBooks.style.zIndex = "1";
                    springBooks.classList.add("visuallyhidden");
                    summerBooks.classList.add("visuallyhidden");
                    autumnBooks.classList.add("visuallyhidden");
                    break;
                case "spring":
                    clearTimeout(timeOutWinter);
                    clearTimeout(timeOutSummer);
                    clearTimeout(timeOutAutumn);
                    winterBooks.classList.add("visuallyhidden");
                    timeOutSpring=setTimeout(() => {springBooks.classList.remove("visuallyhidden");}, 700)
                    winterBooks.style.zIndex = "1";
                    springBooks.style.zIndex = "4";
                    summerBooks.style.zIndex = "1";
                    autumnBooks.style.zIndex = "1";
                    summerBooks.classList.add("visuallyhidden");
                    autumnBooks.classList.add("visuallyhidden");
                    break;
                case "summer":
                    clearTimeout(timeOutWinter);
                    clearTimeout(timeOutSpring);
                    clearTimeout(timeOutAutumn);
                    winterBooks.classList.add("visuallyhidden");
                    springBooks.classList.add("visuallyhidden");
                    timeOutSummer=setTimeout(() => {summerBooks.classList.remove("visuallyhidden");}, 700)
                    winterBooks.style.zIndex = "1";
                    springBooks.style.zIndex = "1";
                    autumnBooks.style.zIndex = "1";
                    summerBooks.style.zIndex = "4";
                    autumnBooks.classList.add("visuallyhidden");
                    break;
                case "autumn":
                    clearTimeout(timeOutWinter);
                    clearTimeout(timeOutSpring);
                    clearTimeout(timeOutSummer);
                    winterBooks.classList.add("visuallyhidden");
                    springBooks.classList.add("visuallyhidden");
                    summerBooks.classList.add("visuallyhidden");
                    timeOutAutumn=setTimeout(() => {autumnBooks.classList.remove("visuallyhidden");}, 700)
                    autumnBooks.style.zIndex = "4";
                    winterBooks.style.zIndex = "1";
                    springBooks.style.zIndex = "1";
                    summerBooks.style.zIndex = "1";
            }
        })
    });

    loginButton.addEventListener("click", function(){
        loginModal.classList.add("open");
    })

    registerButton.addEventListener("click", function(){
        registerModal.classList.add("open");
    })

    closeLoginButton.addEventListener("click", function(){
        loginModal.classList.remove("open");
    })

    closeRegisterButton.addEventListener("click", function(){
        registerModal.classList.remove("open");
    })

    loginLink.addEventListener("click", function(){
        loginModal.classList.add("open");
        registerModal.classList.remove("open");
    })

    registerLink.addEventListener("click", function(){
        registerModal.classList.add("open");
        loginModal.classList.remove("open");
    })
    
    //Закрытие модального окна Login по клику на любую область вне самого окна
    loginModal.addEventListener("click", event => {
        if(event.target == loginModal) loginModal.classList.remove("open");
    })

    //Закрытие модального окна Register по клику на любую область вне самого окна
    registerModal.addEventListener("click", event => {
        if(event.target == registerModal) registerModal.classList.remove("open");
    })

    //Закрытие или открытие меню по клику на иконку, а так же закрытие бургер меню если оно открыто
    iconButton.addEventListener("click", function(){
        dropMenu.classList.toggle("open");
        header.classList.remove("open");
    })

    //Закрытие дроп меню в любой области вне самого меню
    this.body.addEventListener("click", event => {
        const check = event.target != iconButton && !iconButton.contains(event.target) && event.target!=dropMenu && !dropMenu.contains(event.target);
        if(check){
            dropMenu.classList.remove("open");
        } 
    })

    //Открытие модального окна Login по ссылке из дроп меню
    dropLoginLink.addEventListener("click", function(){
        loginModal.classList.add("open");
        dropMenu.classList.remove("open");
    })

    //Открытие модального окна Register по ссылке из дроп меню
    dropRegisterLink.addEventListener("click", function(){
        registerModal.classList.add("open");
        dropMenu.classList.remove("open");
    })

    //Открытие модального окна профиля из дроп меню по ссылке My profile
    dropProfileLink.addEventListener("click", function(){
        profileModal.classList.add("open");
        dropMenu.classList.remove("open");
    })

    //Закрытие модального окна профиля по крестику в модальном окне
    profileCloseButton.addEventListener("click", function(){
        profileModal.classList.remove("open");
    })

    //Закрытие модального окна профиля по любой области вне модального окна
    profileModal.addEventListener("click", event => {
        if(event.target == profileModal) profileModal.classList.remove("open");
    })

    //Открытие модального окна профиля по нажатию на кнопку Profile в секции Digital cards
    profileButton.addEventListener("click", function(){
        profileModal.classList.add("open");
    })

    //Копирование номера карточки по нажатию на кнопку в модальном окне профиля
    copyNumberButton.addEventListener("click", function(){
        const copyText = document.querySelector(".card_numbers");
        copyText.select();
        window.navigator.clipboard.writeText(copyText.value);
    })

    //При нажатии кнопки Buy в секции Favorites до авторизации показываем модальное окно Login
    if(!localStorage.getItem("active user")){
        buyButtons.forEach(buyButton => {
            buyButton.addEventListener("click",function(){
                loginModal.classList.add("open");
            })
        });
    } 
    if(localStorage.getItem("active user")&&!JSON.parse(localStorage.getItem("active user")).hasReaderCard){
        buyButtons.forEach(buyButton => {
            buyButton.addEventListener("click", function(event){
                buyCardModalWindow.classList.add("open");
                loginModal.classList.remove("open");
                buyBookButton = event.target;
            })
        })
    } else if(localStorage.getItem("active user")&&JSON.parse(localStorage.getItem("active user")).hasReaderCard){
        buyButtons.forEach(buyButton => {
            buyButton.addEventListener("click", function(event){
                const currentUser = JSON.parse(localStorage.getItem("active user")); 
                loginModal.classList.remove("open");
                buyCardModalWindow.classList.remove("open");
                buyBookButton = event.target;
                addBook(currentUser);
                localStorage.setItem(currentUser.cardNumber, JSON.stringify(currentUser));
                localStorage.setItem("active user", JSON.stringify(currentUser));
                createProfileHTML(currentUser);
            })
        })
    }

    //Регистрация пользователя
    registerForm.addEventListener("submit", function(event){
        event.preventDefault();

        //проверка на правильность введенных данных
        const check = isValidNameOrSurname(nameInput.value)&&nameInput.value!=undefined
        && isValidNameOrSurname(surnameInput.value)&&surnameInput.value!=undefined
        && isValidEmail(emailInput.value)&&emailInput.value!=undefined
        && isValidPassword(passwordInput.value)&&passwordInput.value!=undefined;

        if(nameInput.value==""){
            nameInput.classList.add("wrong");
            document.getElementById("message_name_signup").innerHTML = "Fill in the field";
            document.getElementById("message_name_signup").style.display = "block";
        } else if(!isValidNameOrSurname(nameInput.value)){
            nameInput.classList.add("wrong");
            document.getElementById("message_name_signup").innerHTML = "Please enter a valid name";
            document.getElementById("message_name_signup").style.display = "block";
        } //подсвечивание инпута если данные неправильны

        if(surnameInput.value==""){
            surnameInput.classList.add("wrong");
            document.getElementById("message_surname_signup").innerHTML = "Fill in the field";
            document.getElementById("message_surname_signup").style.display = "block";
        }else if(!isValidNameOrSurname(surnameInput.value)){
            surnameInput.classList.add("wrong");
            document.getElementById("message_surname_signup").innerHTML = "Please enter a valid surname";
            document.getElementById("message_surname_signup").style.display = "block";
        }  //подсвечивание инпута если данные неправильны

        if(emailInput.value==""){
            emailInput.classList.add("wrong");
            document.getElementById("message_email_signup").innerHTML = "Fill in the field";
            document.getElementById("message_email_signup").style.display = "block";
        }else if(!isValidEmail(emailInput.value)){
            emailInput.classList.add("wrong");
            document.getElementById("message_email_signup").innerHTML = "Please enter a valid email";
            document.getElementById("message_email_signup").style.display = "block";
        }  //подсвечивание инпута если данные неправильны

        if(passwordInput.value==""){
            passwordInput.classList.add("wrong");
            document.getElementById("message_password_signup").innerHTML = "Fill in the field";
            document.getElementById("message_password_signup").style.display = "block";
        }else if(!isValidPassword(passwordInput.value)){
            passwordInput.classList.add("wrong");
            document.getElementById("message_password_signup").innerHTML = "Password must be at least 8 characters";
            document.getElementById("message_password_signup").style.display = "block";
        }  //подсвечивание инпута если данные неправильны

        //если все данные введены правильно, то создаем профиль
        if(check){
            user.name = nameInput.value;
            user.surname = surnameInput.value;
            user.email = emailInput.value;
            user.password = passwordInput.value;
            user.cardNumber = generateRandomHex();
            user.amountOfVisits++;
            localStorage.setItem(user.cardNumber, JSON.stringify(user));
            registerModal.classList.remove("open");
            localStorage.setItem("active user", JSON.stringify(user));
            createProfileHTML(user);
            location.reload();
        }
    })

    nameInput.addEventListener("input", function(){
        if(!isValidNameOrSurname(nameInput.value)){
            nameInput.classList.add("wrong");
            document.getElementById("message_name_signup").innerHTML = "Please enter a valid name";
            document.getElementById("message_name_signup").style.display = "block";
        } else if (isValidNameOrSurname(nameInput.value)){
            nameInput.classList.remove("wrong");
            document.getElementById("message_name_signup").style.display = "none";
        }
    })

    surnameInput.addEventListener("input", function(){
        if(!isValidNameOrSurname(surnameInput.value)){
            surnameInput.classList.add("wrong");
            document.getElementById("message_surname_signup").innerHTML = "Please enter a valid surname";
            document.getElementById("message_surname_signup").style.display = "block";
        } else if(isValidNameOrSurname(surnameInput.value)){
            surnameInput.classList.remove("wrong");
            document.getElementById("message_surname_signup").style.display = "none";
        }
    })

    emailInput.addEventListener("input", function(){
        if(!isValidEmail(emailInput.value)){
            emailInput.classList.add("wrong");
            document.getElementById("message_email_signup").innerHTML = "Please enter a valid email";
            document.getElementById("message_email_signup").style.display = "block";
        } else if(isValidEmail(emailInput.value)){
            emailInput.classList.remove("wrong");
            document.getElementById("message_email_signup").style.display = "none";
        }
    })

    passwordInput.addEventListener("input", function(){
        if(!isValidPassword(passwordInput.value)){
            passwordInput.classList.add("wrong");
            document.getElementById("message_password_signup").innerHTML = "Password must be at least 8 characters";
            document.getElementById("message_password_signup").style.display = "block";
        } else if(isValidPassword(passwordInput.value)){
            passwordInput.classList.remove("wrong");
            document.getElementById("message_password_signup").style.display = "none";
        }
    })

    //Выход из аккаунта по ссылке Log out в дроп меню
    dropLogoutLink.addEventListener("click", function(){
        localStorage.removeItem("active user");
        location.reload();
    })

    //Авторизация пользователя по форме Login модального окна
    loginForm.addEventListener("submit", function(event){
        let userLogin = undefined;
        event.preventDefault();
        if((isValidEmail(emailOrNumberLogin.value)||isValidCardNumber(emailOrNumberLogin.value))&&isValidPassword(passwordLogin.value)){
            for(let i=0; i<localStorage.length; i++){
                userLogin = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if((userLogin.email == emailOrNumberLogin.value || userLogin.cardNumber == emailOrNumberLogin.value) 
                && userLogin.password == passwordLogin.value){
                    userLogin.amountOfVisits++;
                    localStorage.setItem(userLogin.cardNumber, JSON.stringify(userLogin));
                    localStorage.setItem("active user", JSON.stringify(userLogin));
                    loginModal.classList.remove("open");
                    createProfileHTML(userLogin);
                    location.reload();
                    break;
                } else{
                    userLogin = undefined;
                    emailOrNumberLogin.classList.add("wrong");
                    passwordLogin.classList.add("wrong");
                    document.getElementById("message_password_login").innerHTML = "There is no user with that email or number and password";
                    document.getElementById("message_password_login").style.display = "block";
                }
            }
        } else{
            if(emailOrNumberLogin.value==""){
                emailOrNumberLogin.classList.add("wrong");
                document.getElementById("message_email_or_number").innerHTML = "Fill in this field";
                document.getElementById("message_email_or_number").style.display = "block";
            } else if(!isValidEmail(emailOrNumberLogin.value) && !isValidCardNumber(emailOrNumberLogin.value)){
                emailOrNumberLogin.classList.add("wrong");
                document.getElementById("message_email_or_number").innerHTML = "Please enter a valid email or card number";
                document.getElementById("message_email_or_number").style.display = "block";
            }
            if(passwordLogin.value==""){
                passwordLogin.classList.add("wrong");
                document.getElementById("message_password_login").innerHTML = "Fill in this field";
                document.getElementById("message_password_login").style.display = "block";
            } else if(passwordLogin.value.length<8){
                passwordLogin.classList.add("wrong");
                document.getElementById("message_password_login").innerHTML = "Password must be at least 8 characters";
                document.getElementById("message_password_login").style.display = "block";
            }
            
        }
    })

    //Закрытие модального окна Buy a card по нажатию на крестик
    buyCardCloseButton.addEventListener("click", function(){
        buyCardModalWindow.classList.remove("open");
    })

    //Закрытие модального окна Buy a card по нажатию на любую область вне модального окна
    buyCardModalWindow.addEventListener("click", function(event){
        if(event.target == buyCardModalWindow) buyCardModalWindow.classList.remove("open");
    });

    buyCardForm.addEventListener("submit", function(event){
        event.preventDefault();

        const check = isValidData();
        if(check){
            const currentUser = JSON.parse(localStorage.getItem("active user"));
            currentUser.hasReaderCard = true;
            buyCardModalWindow.classList.remove("open");
            addBook(currentUser);
            localStorage.setItem(currentUser.cardNumber, JSON.stringify(currentUser));
            localStorage.setItem("active user", JSON.stringify(currentUser));
            createProfileHTML(currentUser);
            location.reload();
        }
    })

    bankCardInput.addEventListener("input", function(){
        if(isValidBankCardNumber(bankCardInput.value)){
            bankCardInput.classList.remove("wrong");
            document.getElementById("message_bank_card_number").style.display = "none";
        }
    })

    bankCardMonthInput.addEventListener("input", function(){
        if(isValidMonth(bankCardMonthInput.value)){
            bankCardMonthInput.classList.remove("wrong");
            document.getElementById("message_year").style.display = "none";
        }
    })
    
    bankCardYearInput.addEventListener("input", function(){
        if(isValidYear(bankCardYearInput.value)){
            bankCardYearInput.classList.remove("wrong");
            document.getElementById("message_year").style.display = "none";
        }
    })

    bankCardCVCInput.addEventListener("input", function(){
        if(isValidCVC(bankCardCVCInput.value)){
            bankCardCVCInput.classList.remove("wrong");
            document.getElementById("message_cvc").style.display = "none";
        }
    })

    cardholderNameInput.addEventListener("input", function(){
        if(isValidCardName(cardholderNameInput.value)){
            cardholderNameInput.classList.remove("wrong");
            document.getElementById("message_cardholder_name").style.display = "none";
        }
    })

    postalCodeInput.addEventListener("input", function(){
        if(isValidPostalCode(postalCodeInput.value)){
            postalCodeInput.classList.remove("wrong");
            document.getElementById("message_postal_code").style.display = "none";
        }
    })

    cityInput.addEventListener("input", function(){
        if(isValidCity(cityInput.value)){
            cityInput.classList.remove("wrong");
            document.getElementById("message_city").style.display = "none";
        }
    })

    emailOrNumberLogin.addEventListener("input", function(){
        if(isValidEmail(emailOrNumberLogin.value)||isValidCardNumber(emailOrNumberLogin.value)){
            emailOrNumberLogin.classList.remove("wrong");
            document.getElementById("message_email_or_number").style.display = "none";
        }
    })

    passwordLogin.addEventListener("input", function(){
        if(passwordLogin.value.length<8){
            passwordLogin.classList.add("wrong");
            document.getElementById("message_password_login").innerHTML = "Password must be at least 8 characters";
            document.getElementById("message_password_login").style.display = "block";
        } else{
            passwordLogin.classList.remove("wrong");
            document.getElementById("message_password_login").style.display ="none";
        }

        if(isValidPassword(passwordLogin.value)){
            passwordLogin.classList.remove("wrong");
            document.getElementById("message_password_login").style.display = "none";
        }
    })
    
            

    //Check card form 
    checkCardFrom.addEventListener("submit", function(event){
        event.preventDefault();
        const checkCardNameInput = document.querySelector(".check_card_name");
        const checkCardNumberInput = document.querySelector(".check_card_number");

        console.log(isValidName(checkCardNameInput.value)+" and "+isValidCardNumber(checkCardNumberInput.value))
        console.log(checkCardNameInput.value+" and "+checkCardNumberInput.value);
        let name = "";
        if(isValidName(checkCardNameInput.value)&&isValidCardNumber(checkCardNumberInput.value)){
            let userInfo = undefined;
            name = checkCardNameInput.value.split(" ")[0];
            for(let i=0; i<localStorage.length; i++){
                userInfo = JSON.parse(localStorage.getItem(localStorage.key(i)));
                
                if(userInfo.cardNumber===undefined){
                    continue;
                }
                
                if (checkCardNameInput.value.split(" ").length === 1) {
                    if (userInfo.cardNumber.toLowerCase() === checkCardNumberInput.value.toLowerCase()
                        && (userInfo.name.toLowerCase() === name.toLowerCase() || userInfo.surname.toLowerCase() === name.toLowerCase())) {
                        changeDigitalCardForm(userInfo);
                        setTimeout(() => {
                            checkCardNameInput.value = "";
                            checkCardNumberInput.value = "";
                            clearCheckCardForm()
                        }, 10000)
                        break;
                    } else {
                        userLogin = undefined;
                        //alert("There is no user with this name or card");
                    }
                } else if(checkCardNameInput.value.split(" ").length === 2){
                    let surname = checkCardNameInput.value.split(" ")[1];
                    if (userInfo.cardNumber.toLowerCase() === checkCardNumberInput.value.toLowerCase()
                        && (userInfo.name.toLowerCase() === name.toLowerCase() && userInfo.surname.toLowerCase() === surname.toLowerCase())) {
                        changeDigitalCardForm(userInfo);
                        setTimeout(() => {
                            checkCardNameInput.value = "";
                            checkCardNumberInput.value = "";
                            clearCheckCardForm()
                        }, 10000)
                        break;
                    } else {
                        userLogin = undefined;
                    }
                } else{
                    userLogin = undefined;
                }
                
            }
        }

    })
})

function button1_click() {
    button1.classList.add("colored");
    button1_area.classList.add("checked");
    button2.classList.remove("colored");
    button2_area.classList.remove("checked");
    button3.classList.remove("colored");
    button3_area.classList.remove("checked");
    button4.classList.remove("colored");
    button4_area.classList.remove("checked");
    button5.classList.remove("colored");
    button5_area.classList.remove("checked");
    
    right_counter=0;
    left_counter=0;
    leftCarret.classList.add("deactivated");
    rightCarret.classList.remove("deactivated");

    offset = 0;
    sliderLine.style.left = -offset + "px";
}

function button2_click() {
    button1.classList.remove("colored");
    button1_area.classList.remove("checked");
    button2.classList.add("colored");
    button2_area.classList.add("checked");
    button3.classList.remove("colored");
    button3_area.classList.remove("checked");
    button4.classList.remove("colored");
    button4_area.classList.remove("checked");
    button5.classList.remove("colored");
    button5_area.classList.remove("checked");

    right_counter=1;
    left_counter=1;
    leftCarret.classList.remove("deactivated");
    rightCarret.classList.remove("deactivated");

    offset += image.clientWidth + 25;
    if (offset >= image.clientWidth + 25) {
        offset = image.clientWidth + 25;
    }
    sliderLine.style.left = -offset + "px";
}

function button3_click() {
    button1.classList.remove("colored");
    button1_area.classList.remove("checked");
    button2.classList.remove("colored");
    button2_area.classList.remove("checked");
    button3.classList.add("colored");
    button3_area.classList.add("checked");
    button4.classList.remove("colored");
    button4_area.classList.remove("checked");
    button5.classList.remove("colored");
    button5_area.classList.remove("checked");
    
    right_counter=2;
    left_counter=2;
    leftCarret.classList.remove("deactivated");
    rightCarret.classList.remove("deactivated");

    offset += (image.clientWidth + 25)*2;
    if (offset >= (image.clientWidth + 25) * 2) {
        offset = (image.clientWidth + 25) * 2;
    }
    sliderLine.style.left = -offset + "px";
}

function button4_click() {
    button1.classList.remove("colored");
    button1_area.classList.remove("checked");
    button2.classList.remove("colored");
    button2_area.classList.remove("checked");
    button3.classList.remove("colored");
    button3_area.classList.remove("checked");
    button4.classList.add("colored");
    button4_area.classList.add("checked");
    button5.classList.remove("colored");
    button5_area.classList.remove("checked");
    
    right_counter=3;
    left_counter=3;
    leftCarret.classList.remove("deactivated");
    rightCarret.classList.remove("deactivated");

    offset += (image.clientWidth + 25) * 3;
    if (offset >= (image.clientWidth + 25) * 3) {
        offset = (image.clientWidth + 25) * 3;
    }
    sliderLine.style.left = -offset + "px";
}

function button5_click() {
    button1.classList.remove("colored");
    button1_area.classList.remove("checked");
    button2.classList.remove("colored");
    button2_area.classList.remove("checked");
    button3.classList.remove("colored");
    button3_area.classList.remove("checked");
    button4.classList.remove("colored");
    button4_area.classList.remove("checked");
    button5.classList.add("colored");
    button5_area.classList.add("checked");

    right_counter=4;
    left_counter=4;
    leftCarret.classList.remove("deactivated");
    rightCarret.classList.add("deactivated");

    offset += (image.clientWidth + 25) * 4;
    if (offset >= (image.clientWidth + 25) * 4) {
        offset = (image.clientWidth + 25) * 4;
    }
    sliderLine.style.left = -offset + "px";
}

function isValidNameOrSurname(name) {
    const pattern1 = /^[A-Z]{1}[a-z]+$/;
    const pattern2 = /^[a-z]{2,20}$/;
    return pattern1.test(name) || pattern2.test(name) && name != undefined;
}

function isValidEmail(email) {
    const pattern = /^[A-Za-z0-9]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return pattern.test(email) && email!= undefined;
}

function isValidPassword(password) {
    const pattern = /^.{8,20}$/;
    return pattern.test(password) && password!= undefined;
}

function createProfileHTML(user){
    iconButton.classList.add("after_login");
    document.querySelector(".icon_after_login").innerHTML = user.name[0].toUpperCase()+user.surname[0].toUpperCase();
    document.querySelector(".icon_after_login").title = user.name[0].toUpperCase()+user.name.slice(1) + " " + user.surname[0].toUpperCase()+user.surname.slice(1);
    dropMenu.classList.add("after_login");
    changeDigitalsCardSection(user);
    changeProfileModal(user);
    changeBuyButtons(user);
}

function changeProfileModal(user){
    document.querySelector(".profile_name").innerHTML = user.name[0].toUpperCase()+user.surname[0].toUpperCase();
    document.querySelector(".user_name").innerHTML = user.name + " " + user.surname;
    document.querySelectorAll(".number_of_visits").forEach(element => {
        element.innerHTML = user.amountOfVisits;
    })
    document.querySelectorAll(".number_of_books").forEach(element => {
        element.innerHTML = user.rentedBooks.length;
    })
    document.querySelectorAll(".number_of_bonuses").forEach(element => {
        element.innerHTML = user.bonuses;
    })
    document.querySelector(".card_numbers").value = user.cardNumber;
    document.querySelector(".drop_menu_title").innerHTML = user.cardNumber;
    document.querySelector(".drop_menu_title").style.fontSize = "12px";

    let rentedBooksHTML = "";
    for (let i = 0; i < user.rentedBooks.length; i++) {
        rentedBooksHTML =rentedBooksHTML+ "<li class=rented_books_list_elem>"+updateBookName(user.rentedBooks[i])+"</li>";
    }
    rentedBooksList.innerHTML = rentedBooksHTML;
}

function changeDigitalsCardSection(user){
    document.querySelector(".digital_library_cards").classList.add("after_login");
    document.querySelector(".find_your_card_title").innerHTML = "Your Library card";
    document.querySelector(".find_your_card_input").innerHTML = ` <h5 class="find_your_card_input_title">Brooklyn Public Library</h5>
    <input type="text" name="name" placeholder="${user.name} ${user.surname}" class="find_card_input check_card_name" readonly>
    <input type="text" name="card_number" placeholder="${user.cardNumber.toUpperCase()}" class="find_card_input check_card_number" pattern="[0-9]+" readonly>`;
    document.querySelector(".find_card_input").style.textTransform = "capitalize";
    document.querySelector(".number_of_visits").innerHTML = user.amountOfVisits;
    document.querySelector(".number_of_books").innerHTML = user.rentedBooks.length;
    document.querySelector(".number_of_bonuses").innerHTML = user.bonuses;
}
function changeDigitalCardForm(userInfo){
    changeDigitalsCardSection(userInfo);
    document.querySelector(".get_card_title").style.display = "block";
    document.querySelector(".get_card_title_after_login").style.display = "none";
    document.querySelector(".get_card_text").style.display = "block";
    document.querySelector(".get_card_text_after_login").style.display = "none";
    document.querySelector(".login_button").style.display = "block";
    document.querySelector(".register_button").style.display = "block";
    document.querySelector(".profile_button").style.display = "none";
}

function changeBuyButtons(user) {
    let findBuyButton = undefined;
    for(let i = 0; i<bookNames.length; i++) {
        for(let j = 0; j < user.rentedBooks.length;j++){
            if(bookNames[i].innerHTML===user.rentedBooks[j]){
                findBuyButton = bookNames[i].closest(".staff_picks_book").querySelector(".buy_button");
                findBuyButton.innerHTML = "Own";
                findBuyButton.classList.add("own");
            }
        }
    }
}

function clearCheckCardForm(){
    document.querySelector(".digital_library_cards").classList.remove("after_login");
    document.querySelector(".find_your_card_title").innerHTML = "Find your Library card";
    document.querySelector(".find_your_card_input").innerHTML =`<h5 class="find_your_card_input_title">Brooklyn Public Library</h5>
    <input type="text" name="name" placeholder="Reader's name" value="" class="find_card_input check_card_name">
    <input type="text" name="card_number" placeholder="Card number" value="" class="find_card_input check_card_number">`
}

function generateRandomHex() {
    const min = 0x100000000; // Минимальное 9-значное число в 16-ричной системе
    const max = 0xFFFFFFFFF; // Максимальное 9-значное число в 16-ричной системе

    const randomHex = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomHex.toString(16).toUpperCase(); // Преобразуем в строку в 16-ричной системе и переводим в верхний регистр
}

function isValidBankCardNumber(cardNumber) {
    return cardNumber.length === 16 && !!Number(cardNumber);
}

function isValidMonth(month){
    return month >0 && month <= 12 && month != undefined && !!Number(month);
}

function isValidYear(year){
    return year >=23 && year!= undefined && !!Number(year) && year.length === 2;
}

function isValidCVC(cvc){
    return cvc.length === 3 && cvc!= undefined && !!Number(cvc);
}

function isValidCardName(name){
    const pattern = /^[A-Z]{0,1}[a-z]{2,}\s[A-Z]{0,1}[a-z]{2,}$/;
    return name.length >=2 && name!= undefined && pattern.test(name);
}

function isValidCity(city){
    const pattern = /^[A-Za-z\s]{2,}$/;
    return city.length >= 2 && city!= undefined && pattern.test(city);
}

function isValidPostalCode(postalCode){
    return postalCode.length >=3 && postalCode!= undefined;
}

// Проверка данных в форме покупки карты и выделение красным
function isValidData(){
    const check = isValidBankCardNumber(bankCardInput.value)&&isValidMonth(bankCardMonthInput.value)
    &&isValidYear(bankCardYearInput.value)&&isValidCVC(bankCardCVCInput.value)
    &&isValidCardName(cardholderNameInput.value)&&isValidPostalCode(postalCodeInput.value)&&isValidCity(cityInput.value);
    if(bankCardInput.value==""){
        bankCardInput.classList.add("wrong");
        document.getElementById("message_bank_card_number").innerHTML = "Fill in the field";
        document.getElementById("message_bank_card_number").style.display = "block";
    } else if(!isValidBankCardNumber(bankCardInput.value)){
        bankCardInput.classList.add("wrong");
        document.getElementById("message_bank_card_number").innerHTML = "Please enter a valid bank card number. Should consist of 16 digits";
        document.getElementById("message_bank_card_number").style.display = "block";
    }
    
    if(bankCardMonthInput.value==""&&bankCardYearInput.value==""){
        bankCardMonthInput.classList.add("wrong");
        bankCardYearInput.classList.add("wrong");
        document.getElementById("message_year").innerHTML = "Fill in the fields";
        document.getElementById("message_year").style.display = "block";
    } else if(bankCardMonthInput.value==""){
        bankCardMonthInput.classList.add("wrong");
        document.getElementById("message_year").innerHTML = "Fill in the month";
        document.getElementById("message_year").style.display = "block";
    } else if(bankCardYearInput.value==""){
        bankCardYearInput.classList.add("wrong");
        document.getElementById("message_year").innerHTML = "Fill in the year";
        document.getElementById("message_year").style.display = "block";
    } 

    if(bankCardCVCInput.value==""){
        bankCardCVCInput.classList.add("wrong");
        document.getElementById("message_cvc").innerHTML = "Fill in the field";
        document.getElementById("message_cvc").style.display = "block";
    } else if(!isValidCVC(bankCardCVCInput.value)){
        bankCardCVCInput.classList.add("wrong");
        document.getElementById("message_cvc").innerHTML = "Please enter a valid CVC code. Should consist of 3 digits";
        document.getElementById("message_cvc").style.display = "block";
    }

    if(cardholderNameInput.value == ""){
        cardholderNameInput.classList.add("wrong");
        document.getElementById("message_cardholder_name").innerHTML = "Fill in the field";
        document.getElementById("message_cardholder_name").style.display = "block";
    } else if(!isValidCardName(cardholderNameInput.value)){
        cardholderNameInput.classList.add("wrong");
        document.getElementById("message_cardholder_name").innerHTML = "Please enter a valid name";
        document.getElementById("message_cardholder_name").style.display = "block";
    }

    if(postalCodeInput.value==""){
        postalCodeInput.classList.add("wrong");
        document.getElementById("message_postal_code").innerHTML = "Fill in the field";
        document.getElementById("message_postal_code").style.display = "block";
    }else if(!isValidPostalCode(postalCodeInput.value)){
        postalCodeInput.classList.add("wrong");
        document.getElementById("message_postal_code").innerHTML = "Please enter a valid postal code";
        document.getElementById("message_postal_code").style.display = "block";
    }

    if(cityInput.value == ""){
        cityInput.classList.add("wrong");
        document.getElementById("message_city").innerHTML = "Fill in the field";
        document.getElementById("message_city").style.display = "block";
    }else if(!isValidCity(cityInput.value)){
        cityInput.classList.add("wrong");
        document.getElementById("message_city").innerHTML = "Please enter a valid city";
        document.getElementById("message_city").style.display = "block";
    }
    return check;
}

function isValidName(name){
    return name!=undefined&&name.length >= 2;
}

function isValidCardNumber(cardNumber){
    // console.log("Checking "+cardNumber.length === 9);
    return cardNumber!=undefined&&cardNumber.length === 9;
}

function updateBookName(bookName){
    let newBookName = bookName.split("<br> By ")[0].toLowerCase()+", "+bookName.split("<br> By ")[1];
    return newBookName;
}

function addBook(user){
    buyBookButton.classList.add("own");
    buyBookButton.innerHTML = "Own";
    let bookName = buyBookButton.closest(".staff_picks_book").querySelector(".book_name_author").innerHTML;
    user.rentedBooks.push(bookName);
}
