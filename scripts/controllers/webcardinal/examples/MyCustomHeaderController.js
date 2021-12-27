const { Controller } = WebCardinal.controllers;

class MyCustomHeaderController extends Controller {
    initializeModel = () => ({
        text: 'My awesome header!'
    });

    constructor(element, history) {
        super(element, history);
        this.setModel(this.initializeModel());
    }
}

export default MyCustomHeaderController;