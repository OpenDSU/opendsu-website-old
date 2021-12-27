const { Controller } = WebCardinal.controllers;

export default class ThemeController extends Controller {
    constructor(...props) {
        super(...props);

        this.model = {
            checked: typeof document.body.dataset.theme !== 'string',
        }

        this.model.addExpression('theme', () => {
            if (this.model.checked) {
                delete document.body.dataset.theme;
                return 'light';
            }
            document.body.dataset.theme = 'dark';
            return 'dark';
        }, 'checked')
    }
}