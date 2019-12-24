import { HeaderComponent } from "./components/HeaderComponent.js";
import { FormComponent } from "./components/FormComponent.js";
import { InputComponent } from "./components/InputComponent.js";
import { TableComponent } from "./components/TableComponent.js";
import { FooterComponent } from "./components/FooterComponent.js";

import { ItemComponent } from "./components/ItemComponent.js";
import { ItemObject } from "./ItemObject.js";

const headerAnchor = document.createElement("header");
const formAnchor = document.createElement("article");
const listAnchor = document.createElement("article");
const footerAnchor = document.createElement("footer");

document.body.append(headerAnchor, formAnchor, listAnchor, footerAnchor);

const headerComponent = new HeaderComponent(headerAnchor);
const formComponent = new FormComponent(formAnchor);
const inputComponent = new InputComponent(listAnchor);
const tableComponent = new TableComponent(listAnchor);
const footerComponent = new FooterComponent(footerAnchor);

// If localStorage has a token,
// then check authorization and show to-do list,
// else show authorization form
if (localStorage.getItem("token")) {
    if (checkAuth()) {
        inputComponent.render();
        tableComponent.render();
    }
} else {
    formComponent.render();

    formComponent.form.addEventListener("submit", event => {
        event.preventDefault();
        request();
    });
}

headerComponent.render();
footerComponent.render();

try {
    // if list is exist then load items from localStorage
    if ("list" in localStorage) {
        const list = JSON.parse(localStorage.getItem("list"));

        for (const item of list) {
            const itemComponent = new ItemComponent(item);

            tableComponent.list.addItemComponent(itemComponent);
            tableComponent.bar.setTabsText(tableComponent.list);

            addEventListeners(item, itemComponent);

            tableComponent.render();
        }
    }

    // input button click
    inputComponent.button.addEventListener("click", event => {
        event.preventDefault();

        if (inputComponent.input.value) {
            const itemObject = new ItemObject(
                Date.now(),
                inputComponent.input.value,
                false
            );
            const itemComponent = new ItemComponent(itemObject);

            inputComponent.input.value = "";

            tableComponent.list.addItemComponent(itemComponent);
            tableComponent.bar.setTabsText(tableComponent.list);

            let list;
            if ("list" in localStorage) {
                list = JSON.parse(localStorage.getItem("list"));
            } else {
                list = [];
            }

            list.push(itemObject);
            localStorage.setItem("list", JSON.stringify(list));

            addEventListeners(itemObject, itemComponent);

            tableComponent.render();
        }
    });

    // unfinished tab click event
    tableComponent.bar.unfinished.addEventListener("click", () => {
        tableComponent.bar.isUnfinished = true;
        tableComponent.bar.isFinished = false;
        tableComponent.bar.isAll = false;

        tableComponent.render();
    });

    // finished tab click event
    tableComponent.bar.finished.addEventListener("click", () => {
        tableComponent.bar.isUnfinished = false;
        tableComponent.bar.isFinished = true;
        tableComponent.bar.isAll = false;

        tableComponent.render();
    });

    // all tab click event
    tableComponent.bar.all.addEventListener("click", () => {
        tableComponent.bar.isUnfinished = false;
        tableComponent.bar.isFinished = false;
        tableComponent.bar.isAll = true;

        tableComponent.render();
    });

    // item event listeners
    function addEventListeners(itemObject, itemComponent) {
        // checkbox click event
        itemComponent.checkbox.addEventListener("click", () => {
            checkboxHandler(itemObject, itemComponent);
        });

        // mouse enter event
        itemComponent.item.addEventListener("mouseenter", () => {
            itemComponent.delete.style.backgroundImage =
                "url('icons/x-icon.svg')";
        });

        // mouse leave event
        itemComponent.item.addEventListener("mouseleave", () => {
            itemComponent.delete.style.backgroundImage = "none";
        });

        // delete click event
        itemComponent.delete.addEventListener("click", () => {
            deleteHandler(itemObject, itemComponent);
        });
    }

    function checkboxHandler(itemObject, itemComponent) {
        if (itemComponent.isFinished) {
            tableComponent.list.unfinishedCount++;
            tableComponent.list.finishedCount--;

            itemObject.isFinished = false;
            itemObject.textDecoration = "none";
            itemObject.backgroundImage = "url('icons/square-icon.svg')";

            itemComponent.setItemComponent(itemObject);
        } else {
            tableComponent.list.unfinishedCount--;
            tableComponent.list.finishedCount++;

            itemObject.isFinished = true;
            itemObject.textDecoration = "line-through";
            itemObject.backgroundImage = "url('icons/check-square-icon.svg')";

            itemComponent.setItemComponent(itemObject);
        }

        let list = JSON.parse(localStorage.getItem("list"));
        list = list.map(item => {
            if (item.id === itemObject.id) {
                item = itemObject;
            }

            return item;
        });
        localStorage.setItem("list", JSON.stringify(list));

        tableComponent.bar.setTabsText(tableComponent.list);
        tableComponent.render();
    }

    function deleteHandler(itemObject, itemComponent) {
        tableComponent.list.count--;
        itemComponent.isFinished
            ? tableComponent.list.finishedCount--
            : tableComponent.list.unfinishedCount--;

        const list = JSON.parse(localStorage.getItem("list"));
        list.splice(list.indexOf(itemObject), 1);
        localStorage.setItem("list", JSON.stringify(list));

        delete tableComponent.list.items[itemComponent.id];

        tableComponent.bar.setTabsText(tableComponent.list);
        tableComponent.render();
    }
} catch (ex) {
    console.log(ex);
}

async function checkAuth() {
    try {
        const response = await fetch("https://todo-app-back.herokuapp.com/me", {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        const json = await response.json();

        if (json.token === localStorage.getItem("token")) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log("Exception:", e);
    }
}

async function request() {
    try {
        const response = await fetch(
            "https://todo-app-back.herokuapp.com/login",
            {
                method: "POST",
                body: JSON.stringify({
                    email: formComponent.login,
                    password: formComponent.password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const json = await response.json();

        if (json.error === "User does not exist") {
            formComponent.loginElement.style.borderColor = "red";
            formComponent.passwordElement.style.borderColor = "red";
        } else if (json.error === "Wrong password") {
            formComponent.loginElement.style.borderColor = "green";
            formComponent.passwordElement.style.borderColor = "red";
        } else {
            formComponent.loginElement.style.borderColor = "green";
            formComponent.passwordElement.style.borderColor = "green";

            localStorage.setItem("id", json.id);
            localStorage.setItem("token", json.token);

            inputComponent.render();
            tableComponent.render();
            formAnchor.innerHTML = "";
        }
    } catch (e) {
        console.log("Exception:", e);
    }
}
