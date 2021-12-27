const { WebcController } = WebCardinal.controllers;

class WebcModalExamplesController extends WebcController {
    initializeModel = () => ({ value: 0 });

    constructor(element, history) {
        super(element, history);

        this.onTagClick('show-example1', this.example1.bind(this));
        this.onTagClick('show-example2', this.example2.bind(this));
        this.onTagClick('show-example3', this.example3.bind(this));
        this.onTagClick('show-example4', this.example4.bind(this));
    }

    example1() {
        /**
         * @param {string} content
         * @param {string} [title]
         * @param {Function} [onConfirm]
         * @param {Function} [onClose]
         * @param {object} [props]
         */
        this.showModal('Hello Content 👋', 'Example 1', event => {
            console.log('event', event, event.detail);
            console.log('Good bye "Example 1"!');
        });
    }

    example2() {
        const onYesResponse = () => console.log('Thank you!');
        const onNoResponse = () => console.log('Why not?');

        /**
         * @param {string | Error | object} error
         * @param {string} [title]
         * @param {Function} [onConfirm]
         * @param {Function} [onClose]
         * @param {object} [props]
         */
        this.showErrorModal(
            new Error(`Do you want to continue?`), // An error or a string, it's your choice
            'Oh no, an error..',
            onYesResponse,
            onNoResponse,
            {
                disableExpanding: true,
                cancelButtonText: 'No',
                confirmButtonText: 'Yes',
                id: 'error-modal'
            }
        );
    }

    example3() {
        /**
         * @param {string | Error | object} error
         * @param {string} [title]
         * @param {string | object} url
         * @param {object} [props]
         */
        this.showErrorModalAndRedirect(
            'Wait 3 seconds',
            'Redirect...',
            { tag: 'webcardinal-cheatsheet' },
            3000
        );
    }

    example4() {
        const onConfirm = event => console.log(event);
        const onClose = event => console.log(event);

        /**
         * @param {string} template,
         * @param {Function} [onConfirm]
         * @param {Function} [onClose]
         * @param {object} [props]
         */
        this.showModalFromTemplate('my-modal-template', onConfirm, onClose, {
            controller: 'webcardinal/examples/MyModalController',
            disableExpanding: true,
            disableBackdropClosing: false
        });
    }
}

export default WebcModalExamplesController;