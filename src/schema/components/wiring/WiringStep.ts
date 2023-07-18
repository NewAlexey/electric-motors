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

        this.drawArrowsV2({
            slot,
            windingDirection,
            firstIdPair: idList,
        });
    }

    private drawArrowsV2({
        slot,
        firstIdPair,
        windingDirection,
    }: DrawArrowsPropsType) {
        if (windingDirection === "direct") {
            this.drawWiringDirect({ slot, firstIdPair });
        } else {
            this.drawWiringReverse({ slot, firstIdPair });
        }
    }

    private drawWiringDirect({ slot, firstIdPair }: DrawArrowByDirection) {
        let firstElementIdNumber = Number(firstIdPair[0]);
        let secondElementIdNumber = Number(firstIdPair[1]);

        while (firstElementIdNumber <= slot) {
            const firstElementId = `${this.SLOT_ID_TITLE_PART}${firstElementIdNumber}`;
            const secondElementId = `${this.SLOT_ID_TITLE_PART}${secondElementIdNumber}`;

            const { firstLabelElement, secondLabelElement } =
                this.getSlotLabelElementsByIdList({
                    firstElementId,
                    secondElementId,
                });

            this.drawArrow(firstLabelElement, secondLabelElement);

            firstElementIdNumber += 1;
            secondElementIdNumber += 1;

            if (secondElementIdNumber > slot) {
                secondElementIdNumber = secondElementIdNumber - slot;
            }
        }
    }

    private drawWiringReverse({ slot, firstIdPair }: DrawArrowByDirection) {
        let firstElementIdNumberV2 = Number(firstIdPair[1]);
        let secondElementIdNumberV2 = Number(firstIdPair[0]);

        while (secondElementIdNumberV2 <= slot) {
            const firstElementId = `${this.SLOT_ID_TITLE_PART}${firstElementIdNumberV2}`;
            const secondElementId = `${this.SLOT_ID_TITLE_PART}${secondElementIdNumberV2}`;

            const { firstLabelElement, secondLabelElement } =
                this.getSlotLabelElementsByIdList({
                    firstElementId,
                    secondElementId,
                });

            this.drawArrow(firstLabelElement, secondLabelElement);

            firstElementIdNumberV2 += 1;
            secondElementIdNumberV2 += 1;

            if (firstElementIdNumberV2 > slot) {
                firstElementIdNumberV2 = firstElementIdNumberV2 - slot;
            }
        }
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
    firstIdPair: string[];
    windingDirection: WindingDirectionType;
};

type DrawArrowByDirection = Omit<DrawArrowsPropsType, "windingDirection">;
