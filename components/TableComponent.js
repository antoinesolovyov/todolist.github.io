import { BarComponent } from "./BarComponent.js";
import { ListComponent } from "./ListComponent.js";

export class TableComponent {
    constructor(anchor) {
        this.table = document.createElement("div");

        this.bar = new BarComponent(this.table);
        this.list = new ListComponent();

        this.anchor = anchor;
    }

    render() {
        this.bar.render();

        if (this.bar.isUnfinished) {
            this.table.append(this.list.unfinishedList);
        } else if (this.bar.isFinished) {
            this.table.append(this.list.finishedList);
        } else {
            this.table.append(this.list.allList);
        }

        this.anchor.append(this.table);
    }
}
