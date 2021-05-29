import { fromEvent } from 'rxjs';
import Component, {ComponentProps, getComponent, getComponents} from '../../app/js/component';
import FormButton from "../form-button/form-button";

export let valid:boolean;


export default class Input extends Component.Default {
    input: HTMLInputElement;
    name: string;
    value: string;
    type: string;
    required: boolean;
    error: HTMLElement;
    regex: RegExp;
    onChange: () => void;

    constructor(element: ComponentProps, onChange: () => void) {
        super(element);

        this.input = this.nRoot.querySelector('input');
        this.name = this.input.name;
        this.value = this.input.value;
        this.type = this.input.type;
        this.required = this.input.hasAttribute('data-required');

        switch (this.name) {
            case 'email':
                this.regex = /\S+@\S+\.\S+/
                break
            case 'name':
                this.regex = /\S.*/
                break
            case 'phone':
                this.regex = /\S.*/
                break
            default:
                this.regex = null;
                break
        }

        this.error = this.getElement('error');

        this.onChange = onChange;

        fromEvent(this.input, 'input').subscribe(this.onChangeInput);

    }

    getValue = () => this.input.value;

    onChangeInput = (e: Event) => {

        if (this.regex.test(this.input.value) == false) {
            this.type == 'email' ? this.setError('Неверный email') : this.setError('Заполните поле');
            valid = false;
        } else {
            this.setError('')
            valid = true;
        }

        if (this.required) this.onChange();

        if ((<HTMLInputElement>e.target)?.value?.length) {
            this.nRoot.classList.add('fill');
        } else {
            this.nRoot.classList.remove('fill');
        }
    }

    setError = (content:string) => {
        this.error.innerHTML = content;
    }


    destroy = () => {
        // Destroy functions
    }
}
