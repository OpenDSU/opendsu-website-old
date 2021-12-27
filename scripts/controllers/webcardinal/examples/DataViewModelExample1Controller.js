const { WebcController } = WebCardinal.controllers;

export default class DataViewModelExample1Controller extends WebcController {
    initializeModel = () => ({
        divModel: {
            content: `Hello "data-view-model"!`,
            class: 'example-class',
            id: 'example-id',
            tag: 'example-tag', // "data-tag" attribute of WebCardinal
            'data-custom': 'example-data',
        }
    })

    constructor(element, history) {
        super(element, history);
        this.setModel(this.initializeModel());
    }
}