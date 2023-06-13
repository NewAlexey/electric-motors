import LeaderLine from "leader-line-new";

import { DrawWiringArrowsType } from "../../type.ts";
import { getElementById } from "../../../shared/getElementById.ts";
import { WindingDirectionType } from "../../../form/types.ts";

export class WiringStep {
    private readonly ARROW_CLASSNAME = ".leader-line";

    private readonly SLOT_ID_TITLE_PART: string;

    constructor({ slotIdTitlePart }: { slotIdTitlePart: string }) {
        this.SLOT_ID_TITLE_PART = slotIdTitlePart;
    }

    public drawWiringArrows({
        slot,
        wiringStep,
        windingDirection,
    }: DrawWiringArrowsType) {
        const idList: string[] = this.getIdSlotList(wiringStep);
        const step = this.getWiringStep(idList);

        this.drawArrows({
            slot,
            step,
            windingDirection,
            firstIdPair: idList,
        });
    }

    public changeWiringStep({
        slot,
        wiringStep,
        windingDirection,
    }: DrawWiringArrowsType) {
        this.removeOldArrows();

        this.drawWiringArrows({ slot, wiringStep, windingDirection });
    }

    private removeOldArrows() {
        document
            .querySelectorAll(this.ARROW_CLASSNAME)
            .forEach((element) => element.remove());
    }

    private drawArrows({
        slot,
        step,
        firstIdPair,
        windingDirection,
    }: DrawArrowsPropsType) {
        let firstElementId;
        let secondElementId;

        if (windingDirection === "reverse") {
            firstElementId = `${this.SLOT_ID_TITLE_PART}${firstIdPair[1]}`;
            secondElementId = `${this.SLOT_ID_TITLE_PART}${firstIdPair[0]}`;
        } else {
            firstElementId = `${this.SLOT_ID_TITLE_PART}${firstIdPair[0]}`;
            secondElementId = `${this.SLOT_ID_TITLE_PART}${firstIdPair[1]}`;
        }

        const { firstLabelElement, secondLabelElement } =
            this.getSlotLabelElementsByIdList({
                firstElementId,
                secondElementId,
            });

        this.drawArrow(firstLabelElement, secondLabelElement);

        let count = 1;
        let endLabelElementId = Number(firstIdPair[1]);

        while (count < slot) {
            const updatedEndLabelElementId = this.getNextElementId({
                slot,
                step,
                endLabelElementId,
            });

            const { firstLabelElement, secondLabelElement } =
                this.getSlotLabelElementsByIdList({
                    firstElementId: `${this.SLOT_ID_TITLE_PART}${endLabelElementId}`,
                    secondElementId: `${this.SLOT_ID_TITLE_PART}${updatedEndLabelElementId}`,
                });

            this.drawArrow(firstLabelElement, secondLabelElement);

            count += 1;
            endLabelElementId = updatedEndLabelElementId;
        }
    }

    private getNextElementId({
        slot,
        step,
        endLabelElementId,
    }: {
        slot: number;
        step: number;
        endLabelElementId: number;
    }): number {
        const nextElementId = endLabelElementId + step;

        return nextElementId <= slot ? nextElementId : nextElementId - slot;
    }

    private getWiringStep(idList: string[]): number {
        return Math.abs(Number(idList[0]) - Number(idList[1]));
    }

    private drawArrow(
        startElement: HTMLElement,
        endElement: HTMLElement,
    ): void {
        new LeaderLine(startElement, endElement, {
            color: "black",
            path: "straight",
            size: 2,
            startPlug: "behind",
            endPlug: "arrow1",
            endPlugSize: 2.5,
        });
    }

    private getSlotLabelElementsByIdList({
        firstElementId,
        secondElementId,
    }: GetSlotLabelElementsByIds): SpanElements {
        const firstSlotElement = getElementById(firstElementId);
        const secondSlotElement = getElementById(secondElementId);

        const firstLabelElement =
            firstSlotElement.getElementsByTagName("span")[0];

        const secondLabelElement =
            secondSlotElement.getElementsByTagName("span")[0];

        return { firstLabelElement, secondLabelElement };
    }

    private getIdSlotList(wiringStep: string): string[] {
        return wiringStep.split("-");
    }
}

type GetSlotLabelElementsByIds = {
    firstElementId: string;
    secondElementId: string;
};

type SpanElements = {
    firstLabelElement: HTMLElement;
    secondLabelElement: HTMLElement;
};

type DrawArrowsPropsType = {
    slot: number;
    step: number;
    firstIdPair: string[];
    windingDirection: WindingDirectionType;
};
