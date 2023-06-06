export function getElementById(elementId: string): HTMLElement {
    const element = document.getElementById(elementId);

    if (!element) {
        throw Error(`Check element with id - ${elementId} - in DOM.`);
    }

    return element;
}
