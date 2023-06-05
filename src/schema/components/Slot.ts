import { getElementCenteredCordsById } from "../utils/DOMUtils.ts";

export class Slot {
    private readonly SLOT_ELEMENT_CLASS = "slot-item";
    private readonly SLOT_LIST_CONTAINER_ID = "slot__container";
    private readonly SLOT_WIDTH_PX = 48;
    private readonly SLOT_HEIGHT_PX = 64;

    public getContainerWithSlotList(slotCount: number) {
        const slotListContainer = document.getElementById(
            this.SLOT_LIST_CONTAINER_ID,
        );

        if (!slotListContainer) {
            throw Error(
                `Check slot list container id -${this.SLOT_LIST_CONTAINER_ID}.`,
            );
        }

        slotListContainer.innerHTML = "";

        const centerCoords = getElementCenteredCordsById(
            this.SLOT_LIST_CONTAINER_ID,
        );

        for (let i = 0; i < slotCount; i++) {
            const slotElement = document.createElement("div");

            slotElement.classList.add(this.SLOT_ELEMENT_CLASS);

            const leftCoordinate = `${
                centerCoords.x - this.SLOT_WIDTH_PX / 2
            }px`;
            const topCoordinate = `${
                centerCoords.y + centerCoords.y - this.SLOT_HEIGHT_PX
            }px`;
            const transformOriginStyle = `${this.SLOT_WIDTH_PX / 2}px -${
                centerCoords.y - this.SLOT_HEIGHT_PX
            }px`;
            const rotateAngle = (360 / slotCount) * i;

            slotElement.style.left = leftCoordinate;
            slotElement.style.top = topCoordinate;
            slotElement.style.transformOrigin = transformOriginStyle;
            slotElement.style.transform = `rotate(${-rotateAngle}deg)`;

            slotListContainer.appendChild(slotElement);
        }

        return slotListContainer;
    }
}
