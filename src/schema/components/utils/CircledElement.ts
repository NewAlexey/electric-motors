import {
    CircledElementConstructorType,
    CreateElementPropsType,
    CreateElementStylesType,
    CreateElementType,
    CreateSerialNumberElementType,
    GetContainerWithElementsListType,
} from "./types.ts";
import { getElementById } from "../../../shared/getElementById.ts";
import { clearContainerContent } from "../../../shared/clearContainerContent.ts";
import { getElementCentralCoordsById } from "../../../shared/getElementCentralCoordsById.ts";
import { getRotateAngleByCountAndIndex } from "../../../shared/getRotateAngleByCountAndIndex.ts";

export class CircledElement {
    private readonly ELEMENT_WIDTH_PX: number;
    private readonly ELEMENT_HEIGHT_PX: number;
    private readonly ELEMENT_ID_TITLE_PART: string;
    private readonly CONTAINER_ID: string;
    private readonly ELEMENT_ID_LIST: Array<string> = [];

    constructor({
        containerId,
        elementWidth,
        elementHeight,
        elementIdTitlePart,
    }: CircledElementConstructorType) {
        this.CONTAINER_ID = containerId;
        this.ELEMENT_WIDTH_PX = elementWidth;
        this.ELEMENT_HEIGHT_PX = elementHeight;
        this.ELEMENT_ID_TITLE_PART = elementIdTitlePart;
    }

    protected getContainerWithElementList({
        elementCount,
    }: GetContainerWithElementsListType): HTMLElement {
        const elementListContainer = getElementById(this.CONTAINER_ID);

        this.clearIdList();
        clearContainerContent(elementListContainer);

        const elementContainerCenterCoords = getElementCentralCoordsById(
            this.CONTAINER_ID,
        );

        for (let i = 0; i < elementCount; i++) {
            const { element, rotateAngle, serialNumber } = this.createElement({
                elementCount,
                elementContainerCenterCoords,
                index: i,
            });

            const serialNumberElement = this.createSerialNumberElement({
                serialNumber,
                rotateAngle,
            });

            element.appendChild(serialNumberElement);
            elementListContainer.appendChild(element);
        }

        return elementListContainer;
    }

    protected getSlotIdList(): Array<string> {
        return this.ELEMENT_ID_LIST;
    }

    private createElement({
        elementCount,
        index,
        elementContainerCenterCoords,
    }: CreateElementPropsType): CreateElementType {
        const element = document.createElement("div");

        const {
            id,
            rotateAngle,
            serialNumber,
            topCoordinate,
            leftCoordinate,
            transformOriginStyle,
        } = this.createElementStyles({
            index,
            elementCount,
            elementContainerCenterCoords,
        });

        element.id = id;
        element.id = id;
        element.style.left = leftCoordinate;
        element.style.top = topCoordinate;
        element.style.transformOrigin = transformOriginStyle;
        element.style.transform = `rotate(${-rotateAngle}deg)`;

        this.ELEMENT_ID_LIST.push(id);

        return { element: element, rotateAngle, serialNumber };
    }

    private createElementStyles({
        index,
        elementCount,
        elementContainerCenterCoords,
    }: CreateElementPropsType): CreateElementStylesType {
        const leftCoordinate = `${
            elementContainerCenterCoords.x - this.ELEMENT_WIDTH_PX / 2
        }px`;
        const topCoordinate = `${
            elementContainerCenterCoords.y +
            elementContainerCenterCoords.y -
            this.ELEMENT_HEIGHT_PX
        }px`;
        const transformOriginStyle = `${this.ELEMENT_WIDTH_PX / 2}px -${
            elementContainerCenterCoords.y - this.ELEMENT_HEIGHT_PX
        }px`;
        const rotateAngle = getRotateAngleByCountAndIndex(elementCount, index);

        const serialNumber = index + 1;
        const id = `${this.ELEMENT_ID_TITLE_PART}${serialNumber}`;

        return {
            id,
            rotateAngle,
            serialNumber,
            topCoordinate,
            leftCoordinate,
            transformOriginStyle,
        };
    }

    private createSerialNumberElement({
        serialNumber,
        rotateAngle,
    }: CreateSerialNumberElementType): HTMLSpanElement {
        const serialNumberElement = document.createElement("span");
        serialNumberElement.innerText = String(serialNumber);
        serialNumberElement.style.transform = `rotate(${rotateAngle}deg)`;

        return serialNumberElement;
    }

    private clearIdList() {
        this.ELEMENT_ID_LIST.splice(0, this.ELEMENT_ID_LIST.length);
    }
}
