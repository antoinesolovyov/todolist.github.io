export class Render {
    constructor(context, render) {
        this.context = context;
        this.render = render.bind(context);
    }
}