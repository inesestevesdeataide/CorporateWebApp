// FUNCTIONS
async function showErrorMessageIfExists() {
    const error = document.querySelector("#error");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if (email.value.trim() === "" || password.value.trim() === "") {
        error.innerHTML = `Os dois campos são de preenchimento obrigatório!`;
        if (email.value.trim() === "") {
            email.focus();
        } else {
            password.focus();
        }
    } else {

        if (!validateEmail(email.value)) {
            error.innerHTML = `O e-mail tem um formato incorrecto!`;
            email.value = "";
            email.focus();
        } else {
            let activeUser = await checkForMatch(email.value, password.value);

            if (activeUser === 0) {
                error.innerHTML = `Utilizador inexistente!`;
            }
            else {
                finishUserAction(activeUser, "login");
            }
        }
    }
};

function validateEmail(input) {
    const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    const isValidEmail = emailRegex.test(input);

    if (isValidEmail) {
        return true;
    } else {
        return false;
    }
};

async function checkForMatch(email, password) {
    const url = "http://localhost:3000";

    const response = await fetch(`${url}/utilizadores/?email=${email}&senha=${password}`)
    if (response.ok) {
        let data = await response.json();
        if (data.length !== 0) {
            activeUser = data[0];
            return activeUser;
        } else {
            return 0;
        }
    }
};

function finishUserAction(user, action) {
    const welcomeMessage = document.querySelector("#welcomeMessage");

    if (action === "logout") {
        welcomeMessage.innerHTML = ``;

        replaceIcon(userAction, "fa-regular fa-user", "loginIcon", "Login");
        clearModalInputs("#error", "#email", "#password");

        sessionStorage.clear();
    } else {
        welcomeMessage.innerHTML = `Bem-vindo(a), ${user.nome}`;

        replaceIcon(userAction, "fa-solid fa-arrow-right-from-bracket", "logoutIcon", "Logout");
        sessionStorage.setItem("userId", user.id);

        loginModal.style.visibility = "hidden";
    }
};

function replaceIcon(icon, className, id, title) {
    icon.className = className;
    icon.id = id;
    icon.title = title;
};

function clearModalInputs(errorId, emailId, passwordId) {
    clearInnerHtml(errorId)
    clearInput(emailId);
    clearInput(passwordId);
};

function clearInput(inputId) {
    document.querySelector(inputId).value = "";
};

function clearInnerHtml(inputId) {
    document.querySelector(inputId).innerHTML = ``;
};

function showSlides() {
    const slides = document.querySelectorAll(".slide");

    for (let slide of slides) {
        slide.style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
};

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// BACK TO TOP ARROW //
document.querySelector(".backToTopContainer").addEventListener("click", function () {
    window.scrollTo(0, 0);
});

// CLEAR LOGIN MODAL ON EXIT
document.querySelector("#btnClose").addEventListener("click", function () {
    clearModalInputs("#error", "#email", "#password");
    document.querySelector("#loginModal").style.visibility = "hidden";
});

// LOGIN/LOGOUT
let userAction = document.querySelector("#loginIcon");

userAction.addEventListener("click", function (e) {
    const loginModal = document.querySelector("#loginModal");
    let iconTitle = e.target.getAttribute("title");

    if (iconTitle === "Login") {
        loginModal.style.visibility = "visible";
    } else {
        loginModal.style.visibility = "hidden";
        finishUserAction("", "logout");
    }
});

let activeUser = "";

document.querySelector("#btnValidate").addEventListener("click", () => {
    showErrorMessageIfExists();
});

// HEADER - SEARCH BAR
const searchIcon = document.querySelector("#searchIcon");
const searchBar = document.querySelector("#searchBar");

searchIcon.addEventListener("click", function () {
    searchIcon.style.color = "#0075be";
    searchBar.style.display = "block";
    setTimeout(function () {
        searchBar.style.width = "300px";
        searchBar.style.transition = "width 0.50s ease-in-out";
        searchBar.focus();
    }, 500);
});

document.body.addEventListener("click", function (e) {
    if (!searchBar.contains(e.target) && !searchIcon.contains(e.target)) {
        searchIcon.style.color = "#3b3d41";
        searchBar.style.width = "0px";
        searchBar.style.transition = "width 0.50s ease-in-out";
        setTimeout(function () {
            searchBar.style.display = "none";
        }, 500);
    }
});

// HEADER - HAMBURGER MENU
const hamburgerIcon = document.querySelector("#hamburger");

hamburgerIcon.addEventListener("click", function () {
    const navBar = document.querySelector("nav");

    hamburgerIcon.classList.toggle("active");
    navBar.classList.toggle("active");
});

// BANNER - KNOW MORE
const btnKnowMore = document.querySelector("#btnKnowMore");

btnKnowMore.setAttribute("class", "")
btnKnowMore.addEventListener("mouseenter", function () {
    btnKnowMore.classList.add("active");
});
btnKnowMore.addEventListener("mouseleave", function () {
    btnKnowMore.classList.remove("active");
});
btnKnowMore.addEventListener("click", function () {
    btnKnowMore.classList.remove("active");
});

// SLIDER
let slideIndex = 0;
showSlides();

// COOKIES - READ AND AGREED
const readAndAgreed = document.querySelector("#btnReadAndConsent");

readAndAgreed.addEventListener("click", function () {
    const cookiesPopup = document.querySelector(".cookiesPopup");
    
    cookiesPopup.style.visibility = "hidden";
    document.body.style.overflow = "scroll";
});