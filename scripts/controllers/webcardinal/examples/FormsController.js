const { WebcController } = WebCardinal.controllers;

const model = {
    name: {
        name: "name",
        placeholder: "name",
    },
    description: {
        name: "description",
        placeholder: "Description",
    },
    addresses: [
        {
            name: "address1",
            placeholder: "Address",
        },
        {
            name: "address2",
            placeholder: "Address 2",
        },
    ],
    options: [
        { value: "value1", text: "Text 1" },
        { value: "value2", text: "Text 2" },
        { value: "value3", text: "Text 3" },
    ],
    terms: {
        type: "checkbox",
        placeholder: "terms",
        checked: true,
    },
    selectedOption: "value2",
};

export default class FormsController extends WebcController {
    constructor(element, history) {
        super(element, history);
        this.setModel(JSON.parse(JSON.stringify(model)));

        this.onTagClick("add-address", () => {
            this.model.addresses.push({
                name: `address${this.model.addresses.length + 1}`,
                placeholder: "Extra address",
            });
        });

        this.onTagClick("submit", () => {
            const formData = this.model.toObject("name");
            console.log("submitted", formData);
        });

        this.model.addExpression(
            "modeString",
            () => JSON.stringify(this.model.toObject(), null, 2),
            "name",
            "addresses",
            "description",
            "selectedOption",
            "terms"
        );

        this.model.addExpression("canAddAddresses", () => this.model.addresses.length < 4, "addresses");

        setTimeout(() => {
            this.model.selectedOption = "value3";
        }, 2000);
    }
}
