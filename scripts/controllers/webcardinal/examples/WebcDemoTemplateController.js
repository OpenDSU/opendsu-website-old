const { WebcController } = WebCardinal.controllers;

class WebcDemoTemplateController extends WebcController {
    getModel = (_) => ({
        templateInput: {
            type: "text",
            value: 1,
            style: "border: 1px solid yellow",
        },
        templateLabel: {
            text: "Outer template label",
        },
        templateInnerInput: {
            templateInput: {
                type: "text",
                value: 2,
                style: "border: 1px solid red",
            },
            templateLabel: {
                text: "Inner template label",
            },
        },
    });

    constructor(element, history) {
        super(element, history);

        this.setModel(this.getModel());
    }
}

export default WebcDemoTemplateController; // used by <webc-container> and other components
