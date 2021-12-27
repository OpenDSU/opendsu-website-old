const { Controller } = WebCardinal.controllers;

export default class BindingExampleController extends Controller {
    constructor(...props) {
        super(...props);

        this.model = {
            buttonText: "Button",
            hello: "Hello world!",
        };
    }
}
