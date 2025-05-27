function validateFields(){
    const emailValid = isEmailValid();
    document.getElementById('recovery-password-button').disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('login-button').disabled = !emailValid || !passwordValid;
}

function isEmailValid(){
    const email = document.getElementById("email").value;
    if (!email){
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid(){
    const password = document.getElementById('password').value;
    if (!password){
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
        localStorage.setItem("justLoggedIn", "true"); 
        window.location.href = "index.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error){
    if (error.code == "auth/user-not-found"){
        return "Usuário não encontrado";
    }
    return error.message;
}

