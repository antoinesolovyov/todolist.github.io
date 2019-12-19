export class ItemComponent {
    constructor(item) {
        this.checkbox = document.createElement("td");
        this.checkbox.className = "checkbox";
        this.checkbox.style.backgroundImage = item.backgroundImage;

        this.task = document.createElement("td");
        this.task.innerText = item.task;
        this.task.className = "task";
        this.task.style.textDecoration = item.textDecoration;
        
        this.delete = document.createElement("td");
        this.delete.className = "delete";

        this.item = document.createElement("tr");
        this.item.append(this.checkbox, this.task, this.delete);

        this.id = item.id;
        this.isFinished = item.isFinished;
    }

    setItemComponent(itemObject) {
        this.task.style.textDecoration = itemObject.textDecoration;
        this.checkbox.style.backgroundImage = itemObject.backgroundImage;
        this.isFinished = itemObject.isFinished;
    }
}
