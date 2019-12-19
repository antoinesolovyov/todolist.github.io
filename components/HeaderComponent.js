export class HeaderComponent {
    constructor(anchor) {
        this.header = document.createElement("h1");
        this.header.innerText = "To Do List";
        this.header.style.fontWeight = 400;

        this.anchor = anchor;
    }

    render() {
        this.anchor.append(this.header);
    }
}
