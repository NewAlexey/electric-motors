import "./slot.scss";
import styles from "./variables.scss?inline";

import { CircledElement } from "../utils/CircledElement.ts";
import { getValueFromScssExport } from "../../../shared/getValueFromScssExport.ts";
import { GetContainerWithSlotListType } from "./types.ts";
import { getElementById } from "../../../shared/getElementById.ts";

const SLOT_WIDTH_TITLE = "slotWidth";
const SLOT_HEIGHT_TITLE = "slotHeight";
const SLOT_CONTAINER_ID = "slot__container";
const SLOT_ID_TITLE_PART = "slot_";

export class Slot extends CircledElement {
    private readonly SECTOR_CONTAINER_CLASS = "sector__container";

    constructor() {
        const slotWidth = getValueFromScssExport({
            scssExportString: styles,
            cssStyleLength: 2,
            cssStyleName: SLOT_WIDTH_TITLE,
        });

        const slowHeight = getValueFromScssExport({
            scssExportString: styles,
            cssStyleLength: 2,
            cssStyleName: SLOT_HEIGHT_TITLE,
        });

        super({
            elementHeight: slowHeight,
            elementWidth: slotWidth,
            elementIdTitlePart: SLOT_ID_TITLE_PART,
            containerId: SLOT_CONTAINER_ID,
        });
    }

    public getContainerWithSlotList({
        slotCount,
        windingCount,
    }: GetContainerWithSlotListType) {
        const slotContainer = this.getContainerWithElementList({
            elementCount: slotCount,
        });
        this.drawSectorLines(windingCount);

        return slotContainer;
    }

    public drawSectorLines(windingCount: number): void {
        const slotIdList = this.getElementIdList();
        const slotContainer = getElementById(SLOT_CONTAINER_ID);

        slotIdList.forEach((slotId) => {
            const slotElement = slotContainer.querySelector(`#${slotId}`);

            if (!slotElement) {
                throw Error(`Check slot id - ${slotId}`);
            }

            const sectorLineContainer = this.createSectorLines(windingCount);

            slotElement.appendChild(sectorLineContainer);
        });
    }

    public changeSectorCount(windingCount: number) {
        const slotIdList = this.getElementIdList();
        const slotContainer = getElementById(SLOT_CONTAINER_ID);

        slotIdList.forEach((slotId) => {
            const slotElement = slotContainer.querySelector(`#${slotId}`);

            if (!slotElement) {
                throw Error(`Check slot id - ${slotId}`);
            }

            const sectorLinesContainer = slotElement.querySelector(
                `.${this.SECTOR_CONTAINER_CLASS}`,
            );

            if (!sectorLinesContainer) {
                throw Error(
                    `Check sector lines container and class - ${this.SECTOR_CONTAINER_CLASS}`,
                );
            }

            sectorLinesContainer.remove();

            const newSectorLineContainer = this.createSectorLines(windingCount);

            slotElement.appendChild(newSectorLineContainer);
        });
    }

    private createSectorLines(windingCount: number): HTMLDivElement {
        const sectorLinesContainer = document.createElement("div");
        sectorLinesContainer.classList.add(this.SECTOR_CONTAINER_CLASS);

        for (let i = 0; i < windingCount; i++) {
            const sectorLine = document.createElement("div");
            const sectorLineRotateAngle = (180 / windingCount) * i;
            sectorLine.style.transform = `rotate(${sectorLineRotateAngle}deg)`;

            sectorLinesContainer.appendChild(sectorLine);
        }

        return sectorLinesContainer;
    }
}
