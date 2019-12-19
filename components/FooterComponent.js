export class FooterComponent {
    constructor(anchor) {
        this.footer = document.createElement("p");
        this.footer.innerText = "Created by Anton Solovyov";
        this.footer.style.fontWeight = 200;

        this.anchor = anchor;
    }

    render() {
        this.anchor.append(this.footer);
    }
}
