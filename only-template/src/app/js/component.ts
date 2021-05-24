export type ComponentProps<T = HTMLElement> = {
  name: string;
  component: T;
};

namespace Component {
  export class Default {
    nRootName: string;
    nRoot: HTMLElement;
    destroy: () => void;

    constructor({ name, component }: ComponentProps) {
      this.nRootName = name;
      this.nRoot = component;
    }

    getElement = <T extends HTMLElement>(name: string): T =>
      this.nRoot.querySelector(`.${this.nRootName}__${name}`);

    getElements = <T extends HTMLElement>(name: string): T[] =>
      Array.from(this.nRoot.querySelectorAll(`.${this.nRootName}__${name}`));
  }

  export const getComponent = <T extends HTMLElement>(
    name: string,
    target: Document | HTMLElement = document
  ): ComponentProps<T> => ({
    name,
    component: target.querySelector(`.${name}`),
  });

  export const getComponents = <T extends HTMLElement>(
    name: string,
    target: Document | HTMLElement = document
  ): ComponentProps<T>[] =>
    Array.from(target.querySelectorAll(`.${name}`)).map((component: T) => ({
      name,
      component,
    }));
}

export const { getComponent, getComponents } = Component;
export default Component;
