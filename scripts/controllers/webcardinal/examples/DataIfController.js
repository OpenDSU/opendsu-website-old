const { WebcController } = WebCardinal.controllers;

export default class DataIfController extends WebcController {
    initializeModel = () => ({
        gdpr: 0,
        amount: 20,
        currency: "$",
        form: {
            wasSubmitted: false,
            email: {
                label: "Email",
                name: "email",
                isValid: true,
                value: "",
            },
        },
    })

    constructor(element, history) {
        super(element, history);
        this.setModel(this.initializeModel());

        // Create the "formHasErrors" expression
        this.model.addExpression(
            "formHasErrors",
            () => {
                return !this.model.form.email.isValid;
            },
            "form.email.isValid"
        ); // watch the "form.email.isValid" model chain
        // for changes in order to trigger re-evaluation

        this.model.addExpression(
            "userFriendlyAmount",
            function () {
                if (this.currency === "$") {
                    return `${this.currency}${this.amount}`;
                }

                return `${this.amount}${this.currency}`;
            },
            "amount",
            "currency"
        );

        this.onTagClick("toggle-property", () => {
            this.model.gdpr = !this.model.gdpr;
        });

        this.onTagClick("validate-email", () => {
            if (this.model.form.wasSubmitted === false) {
                this.model.form.wasSubmitted = true;
            }
            const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            const emailValue = this.model.form.email.value;
            this.model.form.email.isValid = emailRegex.test(emailValue);
        });
    }
}
