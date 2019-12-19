import { FormComponent } from "./components/FormComponent.js";

import { HeaderComponent } from "./components/HeaderComponent.js";
import { FooterComponent } from "./components/FooterComponent.js";
import { InputComponent } from "./components/InputComponent.js";
import { TableComponent } from "./components/TableComponent.js";

import { ItemComponent } from "./components/ItemComponent.js";
import { ItemObject } from "./ItemObject.js";

const headerAnchor = document.createElement("header");
const articleAnchor = document.createElement("article");
const footerAnchor = document.createElement("footer");

document.body.append(headerAnchor, articleAnchor, footerAnchor);

const headerComponent = new HeaderComponent(headerAnchor);
const footerComponent = new FooterComponent(footerAnchor);
const inputComponent = new InputComponent(articleAnchor);
const tableComponent = new TableComponent(articleAnchor);

const formComponent = new FormComponent(articleAnchor);

headerComponent.render();
formComponent.render();
footerComponent.render();
inputComponent.render();
tableComponent.render();

console.log(localStorage);

try {

// load items from local storage
const keys = Object.keys(localStorage);

for (const key of keys) {
    const itemObject = JSON.parse(localStorage.getItem(key));
    const itemComponent = new ItemComponent(itemObject);

    tableComponent.list.addItemComponent(itemComponent);
    tableComponent.bar.setTabsText(tableComponent.list);

    addEventListeners(itemObject, itemComponent);

    tableComponent.render();
}

// input button onclick
inputComponent.button.onclick = () => {
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

		localStorage.setItem(itemObject.id, JSON.stringify(itemObject));

		addEventListeners(itemObject, itemComponent);

		tableComponent.render();
	}
    
    return false;
};

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

function addEventListeners(itemObject, itemComponent) {
    // checkbox click event
    itemComponent.checkbox.addEventListener("click", () => {
        checkboxHandler(itemObject, itemComponent);
    });

    // mouse enter event
    itemComponent.item.addEventListener("mouseenter", () => {
        itemComponent.delete.style.backgroundImage = "url('icons/x-icon.svg')";
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

// checkbox handler
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

    localStorage.setItem(itemObject.id, JSON.stringify(itemObject));

    tableComponent.bar.setTabsText(tableComponent.list);
    tableComponent.render();
}

// delete handler
function deleteHandler(itemObject, itemComponent) {
    tableComponent.list.count--;
    itemComponent.isFinished
        ? tableComponent.list.finishedCount--
        : tableComponent.list.unfinishedCount--;

    localStorage.removeItem(itemObject.id);
    delete tableComponent.list.items[itemComponent.id];

    tableComponent.bar.setTabsText(tableComponent.list);
    tableComponent.render();
}

} catch(ex) {
	console.log(ex);
}
