export class FormComponent {
    constructor(anchor) {
        this.login = "";
        this.password = "";

        this.id = "";
        this.token = "";

        this.loginElement = document.createElement("input");
        this.loginElement.type = "text";
        this.loginElement.placeholder = "Login";
        this.loginElement.addEventListener("change", event => {
            this.login = event.target.value;
        });

        this.passwordElement = document.createElement("input");
        this.passwordElement.type = "password";
        this.passwordElement.placeholder = "Password";
        this.passwordElement.addEventListener("change", event => {
            this.password = event.target.value;
        });

        this.separatorElement = document.createElement("p");
        this.separatorElement.innerText = "- or -";

        this.signInElement = document.createElement("button");
        this.signInElement.innerText = "Sign In";
        this.signInElement.className = "signIn";

        this.signUpElement = document.createElement("button");
        this.signUpElement.innerText = "Sign Up";
        this.signUpElement.className = "signUp";

        this.form = document.createElement("form");
        this.form.className = "authForm";
        this.form.append(
            this.loginElement,
            this.passwordElement,
            this.signInElement,
            this.separatorElement,
            this.signUpElement
        );

        this.anchor = anchor;
    }

    render() {
        this.anchor.append(this.form);
    }
}
