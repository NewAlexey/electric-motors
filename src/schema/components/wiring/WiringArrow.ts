import "./style.scss";

import { WiringDirectionType } from "../../../form/types.ts";
import { getElementById } from "../../../shared/getElementById.ts";

export class WiringArrow {
    private readonly WIRING_ARROW_CONTAINER_ID = "wiring-direction__container";
    private readonly IMAGE_ARROW_CLASS = "arrow-image";
    private readonly IMAGE_ARROW_LEFT_CLASS = "arrow-image__left";
    private readonly IMAGE_ARROW_RIGHT_CLASS = "arrow-image__right";
    private readonly IMAGE_SRC = "arrow.png";

    public drawDirectionArrow(wiringDirection: WiringDirectionType) {
        const arrowContainer = getElementById(this.WIRING_ARROW_CONTAINER_ID);
        arrowContainer.innerHTML = "";

        const arrowElement = this.changeArrowDirection(wiringDirection);

        arrowContainer.appendChild(arrowElement);
    }

    public changeArrowDirection(wiringDirection: WiringDirectionType) {
        const isArrowSideIsRight = this.isArrowRightSide(wiringDirection);

        return isArrowSideIsRight
            ? this.drawArrowOnRightSide()
            : this.drawArrowOnLeftSide();
    }

    private drawArrowOnRightSide(): Element {
        const imageElement = this.getImageElement();

        imageElement.classList.add(this.IMAGE_ARROW_RIGHT_CLASS);
        return imageElement;
    }

    private drawArrowOnLeftSide(): Element {
        const imageElement = this.getImageElement();

        imageElement.classList.add(this.IMAGE_ARROW_LEFT_CLASS);
        return imageElement;
    }

    private getImageElement(): HTMLImageElement {
        const imageElement = document.createElement("img");
        imageElement.classList.add(this.IMAGE_ARROW_CLASS);
        imageElement.setAttribute("src", this.IMAGE_SRC);

        return imageElement;
    }

    private isArrowRightSide(wiringDirection: WiringDirectionType): boolean {
        return wiringDirection === "right";
    }
}
