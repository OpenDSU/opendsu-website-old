const { WebcController } = WebCardinal.controllers;

class DataTagExample1Controller extends WebcController {
    initializeModel = () => ({ value: 0 });

    constructor(element, history) {
        super(element, history);
        this.setModel(this.initializeModel());
        this.onTagEvent('plus', 'click', () => this.model.value++);
        this.onTagClick('minus', () => this.model.value--);
    }
}

export default DataTagExample1Controller;