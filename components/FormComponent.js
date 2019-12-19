export class FormComponent {
    constructor(anchor) {
        this.login = "";
        this.password = "";

        this.id = "";
        this.token = "";

        this.loginElement = document.createElement("input");
        this.loginElement.type = "text";
        this.loginElement.placeholder = "Login";
        this.passwordElement = document.createElement("input");
        this.passwordElement.type = "password";
        this.passwordElement.placeholder = "Password";

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

        this.form.onsubmit = this.onSubmit.bind(this);

        this.anchor = anchor;
    }

    async request() {
        const response = await fetch(
            "https://todo-app-back.herokuapp.com/login",
            {
                method: "POST",
                body: JSON.stringify({
                    email: "antoinesolovyov@gmail.com",
                    password: "2ie3wsatwtw"
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const json = await response.json();

        return json;
    }

    async checkAuth() {
        const response = await fetch("https://todo-app-back.herokuapp.com/me", {
            method: "GET",
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZjhhM2EwMmVhNzBjMDAxNjgyNmRhOCIsImVtYWlsIjoiYW50b2luZXNvbG92eW92QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJElJNmE5RU9uMnltLlBudUw2NFpHME9ISVJvcjUycHVvSmJrczRxL2ltS05IS0s1dk9rZUZhIiwidXNlcm5hbWUiOiLQkNC90YLQvtC9INCh0L7Qu9C-0LLRjNC10LIiLCJfX3YiOjB9LCJpYXQiOjE1NzY3NDkwNzJ9.rnlk6CL55uAM3Zd8pBEDddBmRZAS3C1iBLbHbe2y9mo"
            }
        });

        const json = await response.json();

        console.log(json.id, json.token);
    }

    onSubmit() {
        const colorRed = "red";
        const colorGreen = "green";

        let flag = false;

        if (this.loginElement.value === "") {
            this.loginElement.style.borderColor = colorRed;
            flag = false;
        } else {
            this.loginElement.style.borderColor = colorGreen;
            this.login = this.loginElement.value;
        }

        if (this.passwordElement.value === "") {
            this.passwordElement.style.borderColor = colorRed;
            flag = false;
        } else {
            this.passwordElement.style.borderColor = colorGreen;
            this.password = this.passwordElement.value;
        }

        this.request();
        this.checkAuth();

        if (flag) {
            document.body.innerHTML = "";
        }

        return flag;
    }

    render() {
        this.anchor.append(this.form);
    }
}
