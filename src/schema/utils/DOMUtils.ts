type ElementCenteredCoordsType = {
    x: number;
    y: number;
};

export function getElementCenteredCordsById(
    elementId: string,
): ElementCenteredCoordsType {
    const element = document.getElementById(elementId);

    if (!element) {
        throw Error("Check id");
    }

    const coords = element.getBoundingClientRect();

    return {
        x: coords.width / 2,
        y: coords.height / 2,
    };
}
