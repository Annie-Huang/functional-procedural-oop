const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

// This is a copy from the opp.js code to here....
function validate(value, flag, validatorValue) {
    if (flag === REQUIRED) {
        return value.trim().length > 0;
    }
    if (flag === MIN_LENGTH) {
        return value.trim().length > validatorValue;
    }
}

function getUserInput(inputElementId) {
    return document.getElementById(inputElementId).value;
}

function createUser(userName, userPassword) {
    if (!validate(userName, REQUIRED) ||
        !validate(userPassword, MIN_LENGTH, 5)) {
        // This is a side effect. Side effect means some logic you execute inside a function which does something outside of a function.
        // e.g. sends http request; change something in the DOM; shows alerts.
        // These are called im-pure functions
        // alert();
        throw new Error(
            'Invalid input - username or password is wrong (password should be at least six characters)'
        );
    }
    return {
        userName: userName,
        password: userPassword
    }
}

// This function calls a side effect too....
function greetUser(user) {
    console.log('Hi, I am ' + user.userName);
}

function signupHandler(event) {
    event.preventDefault();

    // // This is not the functional way.
    // const userNameInput = document.getElementById('username');
    // const enteredUsername = userNameInput.value;
    // const passwordInput = document.getElementById('password');
    // const enteredPassword = passwordInput.value;
    const enteredUsername = getUserInput('username');
    const enteredPassword = getUserInput('password');

    try {
        const newUser = createUser(enteredUsername, enteredPassword);
        console.log(newUser)
        greetUser(newUser);
    } catch (err) {
        // See sometimes you cannot avoid side effect. Just depend on which level in the code you want to put the side effect in.
        alert(err.message);
    }
}

// This idea is to pass everything it needs rather than have side effect.
// So the method can be as predictable as possible, as reuseable as possible.
// function connectForm() {
//     const form = document.getElementById('user-input');
//     form.addEventListener('submit', signupHandler);
// }
function connectForm(formId, forSubmitHandler) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', forSubmitHandler);
}

connectForm('user-input', signupHandler);
