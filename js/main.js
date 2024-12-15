var userNameInput = document.getElementById('userNameInput');
var userEmailInput = document.getElementById('userEmailInput');
var userPasswordInput = document.getElementById('userPasswordInput');

var usersContainer = [];
if (localStorage.getItem('users') != null) {
    usersContainer = JSON.parse(localStorage.getItem('users'));
}
function signUp() {
    var confirmMsg = document.getElementById('confirmMsg');
    var signUpBtn = document.getElementById('signUpBtn');
    var haveAccount = document.getElementById('haveAccount');
    var dontHaveAccount = document.getElementById('dontHaveAccount');
    var confirmSignIn = document.getElementById('confirmSignIn');

    if (isExist() != true && userNameValidation() == true && userEmailValidation() == true && userPasswordValidation() == true) {
        var user = {
            name: userNameInput.value,
            email: userEmailInput.value,
            password: userPasswordInput.value,
        };
        usersContainer.push(user);
        localStorage.setItem('users', JSON.stringify(usersContainer));

        confirmMsg.classList.replace('d-none', 'd-block');
        dontHaveAccount.classList.replace('d-none', 'd-block');
        haveAccount.classList.replace('d-block', 'd-none');
        signUpBtn.classList.replace('d-block', 'd-none');
        confirmSignIn.classList.replace('d-none', 'd-block');
        tryAgainMsg.classList.replace('d-block', 'd-none');
        userNameInput.classList.remove('is-invalid');
        userNameInput.classList.add('is-valid');
        userEmailInput.classList.remove('is-invalid');
        userEmailInput.classList.add('is-valid');
    }
}

function userNameValidation() {
    var nameAlert = document.getElementById('nameAlert');
    var nameExists = document.getElementById('nameExists');
    var regex = /^[A-za-z]{3,15}(\s?[A-Za-z]{3,15})?$/

    if (regex.test(userNameInput.value) == true && userNameInput != "") {
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('is-invalid');
        nameAlert.classList.replace('d-block', 'd-none');
        nameExists.classList.replace('d-block', 'd-none');
        return true;
    }
    else {
        userNameInput.classList.add('is-invalid');
        userNameInput.classList.remove('is-valid');
        nameAlert.classList.replace('d-none', 'd-block');
        return false;
    }
}
function userEmailValidation() {
    var emailAlert = document.getElementById('emailAlert');
    var emailExists = document.getElementById('emailExists');
    var regex = /^(\w){3,20}@[a-z]{3,10}(\.com)$/

    if (regex.test(userEmailInput.value) == true && userEmailInput != "") {
        userEmailInput.classList.add('is-valid');
        userEmailInput.classList.remove('is-invalid');
        emailAlert.classList.replace('d-block', 'd-none');
        emailExists.classList.replace('d-block', 'd-none');
        return true;
    }
    else {
        userEmailInput.classList.add('is-invalid');
        userEmailInput.classList.remove('is-valid');
        emailAlert.classList.replace('d-none', 'd-block');
        return false
    }
}
function userPasswordValidation() {
    var PasswordAlert = document.getElementById('PasswordAlert');
    var regex = /^.{5,15}$/;

    if (regex.test(userPasswordInput.value) == true && userPasswordInput != "") {
        userPasswordInput.classList.add('is-valid');
        userPasswordInput.classList.remove('is-invalid');
        PasswordAlert.classList.replace('d-block', 'd-none');
        return true;
    }
    else {
        userPasswordInput.classList.add('is-invalid');
        userPasswordInput.classList.remove('is-valid');
        PasswordAlert.classList.replace('d-none', 'd-block');
        return false
    }
}
function isExist() {
    var nameExists = document.getElementById('nameExists');
    var emailExists = document.getElementById('emailExists');
    for (var i = 0; i < usersContainer.length; i++) {
        if (usersContainer[i].name.toLowerCase() == userNameInput.value.toLowerCase()) {
            nameExists.classList.replace('d-none', 'd-block');
            userNameInput.classList.remove('is-valid');
            userNameInput.classList.add('is-invalid');
            return true;
        }
        else if (usersContainer[i].email.toLowerCase() == userEmailInput.value.toLowerCase()) {
            emailExists.classList.replace('d-none', 'd-block');
            nameExists.classList.replace('d-block', 'd-none');
            userEmailInput.classList.remove('is-valid');
            userEmailInput.classList.add('is-invalid');
            return true;
        }
    }
}

function login() {
    var loginEmail = document.getElementById('loginEmail');
    var loginPassword = document.getElementById('loginPassword');
    var loginBtn = document.getElementById('loginBtn');
    var fillMsg = document.getElementById('fillMsg');
    var incorrectMsg = document.getElementById('incorrectMsg');

    if (loginEmail.value == '' || loginPassword.value == '') {
        fillMsg.classList.replace('d-none', 'd-block');
        return false;
    }
    for (var i = 0; i < usersContainer.length; i++) {
        if (usersContainer[i].email.toLowerCase() == loginEmail.value.toLowerCase() ||
            usersContainer[i].password.toLowerCase() == loginPassword.value.toLowerCase())
        {
            incorrectMsg.classList.replace('d-none', 'd-block');
        }
    }
    for (var i = 0; i < usersContainer.length; i++) {
        if (usersContainer[i].email.toLowerCase() == loginEmail.value.toLowerCase() &&
            usersContainer[i].password.toLowerCase() == loginPassword.value.toLowerCase())
        {
            incorrectMsg.classList.replace('d-block', 'd-none');
            localStorage.setItem('welcomeUser', usersContainer[i].name);
            loginBtn.setAttribute('href', 'welcome.html');
        }
    }
}

function displayWelcomeUser() {
    var userName = localStorage.getItem('welcomeUser');
    document.getElementById('userName').innerHTML = "Welcome " + userName;
}

function logOut() {
    var logOutBtn = document.getElementById('logOutBtn');
    localStorage.removeItem('welcomeUser');
    logOutBtn.setAttribute('href', 'index.html');
}
