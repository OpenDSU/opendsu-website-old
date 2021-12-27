const { WebcController } = WebCardinal.controllers;

export default class SkinController extends WebcController {
    constructor(...props) {
        super(...props);

        this.model = {
            submitText: this.translate("submit")
        }
    }
}