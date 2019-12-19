const form = document.getElementById('user-input');

function signupHandler(event) {
    // This will prevent the browser from sending the form to backend server
    // Which subsequently lead to a page refresh.
    event.preventDefault();

    const userNameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const enteredUsername = userNameInput.value;
    const enteredPassword = passwordInput.value;

    if (enteredUsername.trim().length === 0) {
        alert('Invalid input - username must not be empty!');
        return;
    }
    if (enteredPassword.trim().length <= 5) {
        alert('Invalid input - password must be size characeter or longer.');
        return;
    }

    const user = {
        userName: enteredUsername,
        password: enteredPassword
    };

    console.log(user);
    console.log('Hi, I am ' + user.userName);
}

form.addEventListener('submit', signupHandler);
