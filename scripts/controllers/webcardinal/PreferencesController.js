const { WebcController } = WebCardinal.controllers;

export default class PreferencesController extends WebcController {
    constructor(...props) {
        super(...props);

        this.onTagClick('preferences', () => {
            this.modal = this.createWebcModal({
                id: 'preferences',
                template: 'preferences',
                controller: 'webcardinal/ThemeController',
                autoShow: true,
                disableBackdropClosing: false,
                disableExpanding: true,
                disableFooter: true
            });
            this.element.parentElement.append(this.modal);
        });
    }
}