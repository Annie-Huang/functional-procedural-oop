class Validator {
    static REQUIRED = 'REQUIRED';
    static MIN_LENGTH = 'MIN_LENGTH';

    static validate(value, flag, validatorValue) {
        if (flag === this.REQUIRED) {
            return value.trim().length > 0;
        }
        if (flag === this.MIN_LENGTH) {
            return value.trim().length > validatorValue;
        }
    }
}

class User {
    constructor(uName, uPassword) {
        this.userName = uName;
        this.password = uPassword;
    }

    greet() {
        console.log('Hi, I am ' + this.userName);
    }
}

class UserInputForm {
    constructor() {
        this.form = document.getElementById('user-input');
        this.userNameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');

        // When you points a function in the create eventListener (signupHandler),
        // the default this will be bounced to the event target
        // To override this, you add .bind(this). It will make sure the 'this' insdeit eh singupHandler method is
        // bind to the 'this' in here (within the constructor). It will be the instance created based on the class.
        this.form.addEventListener('submit', this.signupHandler.bind(this));
    }

    signupHandler(event) {
        event.preventDefault();
        const enteredUsername = this.userNameInput.value;
        const enteredPassword = this.passwordInput.value;

        if (!Validator.validate(enteredUsername, Validator.REQUIRED) ||
            !Validator.validate(enteredPassword, Validator.MIN_LENGTH, 5)) {
            alert('Invalid input - username or password is wrong (password should be at least six characters)');
            return;
        }

        const newUser = new User(enteredUsername, enteredPassword);
        console.log(newUser);
        newUser.greet();
    }
}

new UserInputForm();
