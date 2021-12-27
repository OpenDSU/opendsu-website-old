const { WebcController } = WebCardinal.controllers;
const { loader, root } = WebCardinal;

class WebcSpinnerController extends WebcController {
    initializeModel = () => ({
        text: 'View loader!',
        seconds: ''
    })

    toggleLoader = (model, target) => {
        if (typeof this.model.seconds === 'number') {
            return;
        }

        this.model.seconds = 5;
        this.model.text = 'Loader will hide in: ';
        root.style.filter = 'grayscale(100%)'
        loader.hidden = false;
        target.disabled = true;

        const interval = setInterval(() => {
            if (this.model.seconds === 1) {
                this.model.text = 'View loader!';
                this.model.seconds = '';
                clearInterval(interval);
                root.style.filter = 'none';
                loader.hidden = true;
                target.disabled = false;
                return;
            }
            this.model.seconds--;
        }, 1000);
    }

    constructor(element, history) {
        super(element, history);

        this.setModel(this.initializeModel());

        this.onTagClick('button', this.toggleLoader.bind(this));
    }
}

export default WebcSpinnerController