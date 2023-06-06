import "./slot.scss";
import styles from "./varibales.scss?inline";

import { getElementCentralCoordsById } from "../../utils/getElementCentralCoordsById.ts";
import { getElementById } from "../../utils/getElementById.ts";
import { clearContainerContent } from "../../utils/clearContainerContent.ts";
import {
    createSlotElementPropsType,
    createSlotElementStylesType,
    createSlotElementType,
} from "./types.ts";
import { getValueFromScssExport } from "../../utils/getValueFromScssExport.ts";

export class Slot {
    private readonly SLOT_WIDTH_TITLE = "slotWidth";
    private readonly SLOT_HEIGHT_TITLE = "slotHeight";
    private readonly SLOT_LIST_CONTAINER_ID = "slot__container";
    private readonly SLOT_ID_TITLE_PART = "slot_";
    private readonly SLOT_WIDTH_PX: number;
    private readonly SLOT_HEIGHT_PX: number;
    private readonly slotIdList: Array<string> = [];

    constructor() {
        this.SLOT_WIDTH_PX = getValueFromScssExport({
            scssExportString: styles,
            cssStyleLength: 2,
            cssStyleName: this.SLOT_WIDTH_TITLE,
        });

        this.SLOT_HEIGHT_PX = getValueFromScssExport({
            scssExportString: styles,
            cssStyleLength: 2,
            cssStyleName: this.SLOT_HEIGHT_TITLE,
        });
    }

    public getContainerWithSlotElements(slotCount: number) {
        const slotListContainer = getElementById(this.SLOT_LIST_CONTAINER_ID);

        clearContainerContent(slotListContainer);
        this.slotIdList.splice(0, this.slotIdList.length);

        const slotContainerCenterCoords = getElementCentralCoordsById(
            this.SLOT_LIST_CONTAINER_ID,
        );

        for (let i = 0; i < slotCount; i++) {
            const { serialNumber, rotateAngle, slotElement } =
                this.createSlotElement({
                    slotContainerCenterCoords,
                    slotCount,
                    index: i,
                });

            const serialNumberElement = this.createSerialNumberElement({
                serialNumber,
                rotateAngle,
            });

            slotElement.appendChild(serialNumberElement);
            slotListContainer.appendChild(slotElement);
        }

        return slotListContainer;
    }

    private createSerialNumberElement({
        serialNumber,
        rotateAngle,
    }: {
        serialNumber: number;
        rotateAngle: number;
    }): HTMLSpanElement {
        const serialNumberElement = document.createElement("span");
        serialNumberElement.innerText = String(serialNumber);
        serialNumberElement.style.transform = `rotate(${rotateAngle}deg)`;

        return serialNumberElement;
    }

    private createSlotElement({
        slotCount,
        slotContainerCenterCoords,
        index,
    }: createSlotElementPropsType): createSlotElementType {
        const slotElement = document.createElement("div");

        const {
            id,
            serialNumber,
            leftCoordinate,
            topCoordinate,
            transformOriginStyle,
            rotateAngle,
        } = this.createSlotStyles({
            index,
            slotCount,
            slotContainerCenterCoords,
        });

        slotElement.id = id;
        slotElement.style.left = leftCoordinate;
        slotElement.style.top = topCoordinate;
        slotElement.style.transformOrigin = transformOriginStyle;
        slotElement.style.transform = `rotate(${-rotateAngle}deg)`;

        this.slotIdList.push(id);

        return { slotElement, rotateAngle, serialNumber };
    }

    private createSlotStyles({
        slotCount,
        slotContainerCenterCoords,
        index,
    }: createSlotElementPropsType): createSlotElementStylesType {
        const leftCoordinate = `${
            slotContainerCenterCoords.x - this.SLOT_WIDTH_PX / 2
        }px`;
        const topCoordinate = `${
            slotContainerCenterCoords.y +
            slotContainerCenterCoords.y -
            this.SLOT_HEIGHT_PX
        }px`;
        const transformOriginStyle = `${this.SLOT_WIDTH_PX / 2}px -${
            slotContainerCenterCoords.y - this.SLOT_HEIGHT_PX
        }px`;
        const rotateAngle = (360 / slotCount) * index;

        const serialNumber = index + 1;
        const id = `${this.SLOT_ID_TITLE_PART}${serialNumber}`;

        return {
            id,
            rotateAngle,
            serialNumber,
            topCoordinate,
            leftCoordinate,
            transformOriginStyle,
        };
    }
}
