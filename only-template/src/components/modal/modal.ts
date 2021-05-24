import { fromEvent } from 'rxjs';
import Component, { ComponentProps } from '../../app/js/component';

export default class Modal extends Component.Default {
    id: string;
    links: HTMLElement[];

    constructor(element: ComponentProps) {
        super(element);

        this.id = this.nRoot.id;
        this.links = Array.from(document.querySelectorAll('.modal-link'));

        this.links.forEach((link) => fromEvent(link, 'click').subscribe(this.onClickLink));
        fromEvent(this.getElement('close'), 'click').subscribe(this.hideModal);
    }

    onClickLink = (e: Event) => {
        const target = (<HTMLElement>e.currentTarget);
        const id = target.getAttribute('data-id');

        if (id === this.id) this.showModal();
    };

    showModal = () => this.nRoot.classList.add('show');

    hideModal = () => this.nRoot.classList.remove('show');

    destroy = () => {
        // Destroy functions
    };
}
