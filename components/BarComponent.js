/*\
 *      + –––––––––––––––– + –––––––––––––– + –––––––––– +
 *      | Unfinished [ 0 ] | Finished [ 0 ] | All [ 0 ]  |
 *      + –––––––––––––––– + –––––––––––––– + –––––––––– +
\*/

export class BarComponent {
    constructor(anchor) {
        this.bar = document.createElement("table");
        this.tabList = document.createElement("tr");

        this.unfinished = document.createElement("td");
        this.unfinished.innerText = "Unfinished [ 0 ]";
        this.unfinished.className = "tab";

        this.finished = document.createElement("td");
        this.finished.innerText = "Finished [ 0 ]";
        this.finished.className = "tab";

        this.all = document.createElement("td");
        this.all.innerText = "All [ 0 ]";
        this.all.className = "tab";
        this.all.style.borderRight = "none";

        this.isUnfinished = true;
        this.isFinished = false;
        this.isAll = false;

        this.tabList.append(this.unfinished, this.finished, this.all);
        this.bar.append(this.tabList);

        this.anchor = anchor;
    }

    setTabsText(list) {
        this.unfinished.innerText = `Unfinished [ ${list.unfinishedCount} ]`;
        this.finished.innerText = `Finished [ ${list.finishedCount} ]`;
        this.all.innerText = `All [ ${list.count} ]`;
    }

    render() {
        const borderBottom = "2px solid black";

        if (this.isUnfinished) {
            this.unfinished.style.borderBottom = "none";
            this.finished.style.borderBottom = borderBottom;
            this.all.style.borderBottom = borderBottom;
        } else if (this.isFinished) {
            this.unfinished.style.borderBottom = borderBottom;
            this.finished.style.borderBottom = "none";
            this.all.style.borderBottom = borderBottom;
        } else if (this.isAll) {
            this.unfinished.style.borderBottom = borderBottom;
            this.finished.style.borderBottom = borderBottom;
            this.all.style.borderBottom = "none";
        }

        this.anchor.append(this.bar);
    }
}
