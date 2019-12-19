export class ItemObject {
    constructor(id, task, isFinished) {
        this.id = id;
        this.task = task;
        this.isFinished = isFinished;

        this.textDecoration = "none";
        this.backgroundImage = "url('icons/square-icon.svg')";
    }
}
