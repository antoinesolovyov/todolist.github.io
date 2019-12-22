// log antoinesolovyov@gmail.com
// pas 2ie3wsatwtw

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

    async request() {
        let json;

        try {
            const response = await fetch(
                "https://todo-app-back.herokuapp.com/login",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: this.login,
                        password: this.password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).catch((reason) => {
                console.error(reason);
            });


            json = await response.json();

            if (json.error === "User does not exist") {
                this.loginElement.style.borderColor = "red";
                this.passwordElement.style.borderColor = "red";
            } else if (json.error === "Wrong password") {
                this.loginElement.style.borderColor = "green";
                this.passwordElement.style.borderColor = "red";
            } else {
                this.loginElement.style.borderColor = "green";
                this.passwordElement.style.borderColor = "green";
                localStorage.setItem("id", json.id);
                localStorage.setItem("token", json.token);
            }

            console.log("From request:", json);
        } catch (e) {
            console.log("Exception:", e);
        }

        return json;
    }

    async checkAuth() {
        const response = await fetch("https://todo-app-back.herokuapp.com/me", {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        const json = await response.json();

        console.log("From checkAuth:", json);
        if (json)
            this.anchor.innerHTML = "";
        
        return json;
    }

    onSubmit(event) {
        event.preventDefault();
        this.request();

        return false;
    }

    render() {
        this.anchor.append(this.form);
    }
}
