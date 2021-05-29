import Component, {ComponentProps, getComponent, getComponents} from '../../app/js/component';
import Input, {valid} from "../input/input";
import FormButton from "../form-button/form-button";
import axios from "axios";

export default class Form extends Component.Default {
    inputs: Input[];
    FormButton: FormButton;
    response: HTMLElement;

    constructor(element: ComponentProps) {
        super(element);
        this.inputs = getComponents('input', this.nRoot).map(component => new Input(component, this.updateButton));
        this.FormButton = new FormButton(getComponent('form-button', this.nRoot))

        this.response = this.getElement('response')
        this.nRoot.addEventListener('submit', this.onSubmit);

        this.getList()
    }

    getList = () => {
        axios.get('http://dev.studio-mind.ru/api/form', {
            params: {nameId: 'picheldos'}
        })
            .then(result => console.log(result.data.list))
            .catch(error => console.log(error))
    }

    updateButton = () => {
        if (valid == true) {
            this.FormButton.changeButton(
                this.inputs.every(item => {
                    if (item.required) return item.getValue()
                    return true;
                }));
            } else {
            this.FormButton.changeButton(false);
        }
    }

    onSubmit = async (e: Event) => {
        e.preventDefault();

        let data: any = {};

        this.inputs.forEach(item => {
            data[item.name] = item.getValue();
        });

        const obj = {
            ...data,
            nameId: 'picheldos',
        };

        try {
            await axios.post('http://dev.studio-mind.ru/api/form', obj);

            const div = document.createElement('div')
            div.className = `${this.nRootName}__success-item`;
            div.innerHTML = 'Данные успешно отправлены!';

            this.response.appendChild(div);
        } catch (e) {
            const div = document.createElement('div')
            div.className = `${this.nRootName}__errors-item`;
            div.innerHTML = e.message;

            this.response.appendChild(div);
        }
    }


    destroy = () => {
        // Destroy functions
    }
}
