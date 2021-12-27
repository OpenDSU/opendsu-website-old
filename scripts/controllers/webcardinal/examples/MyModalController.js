const { Controller } = WebCardinal.controllers;

export default class MyModalController extends Controller {
    constructor(...props) {
        super(...props);

        console.log('test')
        console.log(this.model);

        this.model = {
            complex: 'more complex',
            example: 'Form example',
            input: {
                fullName: {
                    type: 'text',
                    placeholder: 'Full name'
                },
                email: {
                    type: 'email',
                    placeholder: 'Email'
                },
                password: {
                    type: 'password',
                    placeholder: 'Password'
                }
            }
        };
    }
}