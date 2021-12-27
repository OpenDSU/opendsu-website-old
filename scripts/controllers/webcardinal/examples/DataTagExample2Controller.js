const { WebcController } = WebCardinal.controllers;

class DataTagExample2Controller extends WebcController {
    initializeModel = () => ({ scale: 1 });

    constructor(element, history) {
        super(element, history);
        this.setModel(this.initializeModel());
        this.onTagEvent('scale', 'wheel', (model, target, event) => {
            event.preventDefault();
            this.model.scale += event.deltaY * -0.005;
            this.model.scale = Math.min(Math.max(.5, this.model.scale), 2);
            target.style.transform = `scale(${this.model.scale})`;
        });
    }
}

export default DataTagExample2Controller;