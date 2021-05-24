import Component, { ComponentProps } from '../../app/js/component';

export default class FormButton extends Component.Default {
    constructor(element: ComponentProps) {
        super(element);
    }

    changeButton = (disabled: boolean) => {
        const disClass = `${this.nRootName}--disabled`
        if (disabled) {
            this.nRoot.classList.remove(disClass);
            this.nRoot.removeAttribute('disabled');
        } else {
            this.nRoot.classList.add(disClass);
            this.nRoot.setAttribute('disabled', 'disabled');
        }
    }

    destroy = () => {
        // Destroy functions
    }
}