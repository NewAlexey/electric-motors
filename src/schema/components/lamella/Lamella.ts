import "./lamella.scss";
import styles from "./variables.scss?inline";

import { getValueFromScssExport } from "../../../shared/getValueFromScssExport.ts";
import { CircledElement } from "../utils/CircledElement.ts";
import { GetContainerWithLamellaListType } from "./type.ts";
import { getElementById } from "../../../shared/getElementById.ts";
import { LamellaPositionType } from "../../../form/types.ts";
import { getRotateDegreeFromTransformString } from "../../../shared/getRotateDegreeFromTransformString.ts";
import { getRotateTransformStyle } from "../../../shared/getRotateTransformStyle.ts";

const LAMELLA_WIDTH_TITLE = "lamellaWidth";
const LAMELLA_HEIGHT_TITLE = "lamellaHeight";
const LAMELLA_CONTAINER_ID = "lamella__container";
const LAMELLA_ID_TITLE_PART = "lamella_";

export class Lamella extends CircledElement {
    private readonly LAMELLAS_DEGREE_SHIFT = 10;

    constructor() {
        const lamellaWidth = getValueFromScssExport({
            scssExportString: styles,
            cssStyleLength: 2,
            cssStyleName: LAMELLA_WIDTH_TITLE,
        });

        const lamellaHeight = getValueFromScssExport({
            scssExportString: styles,
            cssStyleLength: 2,
            cssStyleName: LAMELLA_HEIGHT_TITLE,
        });

        super({
            elementHeight: lamellaHeight,
            elementWidth: lamellaWidth,
            elementIdTitlePart: LAMELLA_ID_TITLE_PART,
            containerId: LAMELLA_CONTAINER_ID,
        });
    }

    public getContainerWithLamellaList({
        lamellaCount,
        lamellaPosition,
    }: GetContainerWithLamellaListType): HTMLElement {
        const additionalAngle = this.checkLamellaPosition(lamellaPosition);

        return this.getContainerWithElementList({
            elementCount: lamellaCount,
            options: {
                additionalAngle,
            },
        });
    }

    private checkLamellaPosition(lamellaPosition: LamellaPositionType): number {
        return lamellaPosition === "combined" ? 0 : this.LAMELLAS_DEGREE_SHIFT;
    }

    public changeLamellaPosition(lamellaPosition: LamellaPositionType) {
        const isLamellasShifted = !(lamellaPosition === "combined");
        const lamellaIdList = this.getElementIdList();

        const lamellaContainer = getElementById(LAMELLA_CONTAINER_ID);

        lamellaIdList.forEach((lamellaId) => {
            const lamellaElement = lamellaContainer.querySelector(
                `#${lamellaId}`,
            );

            if (!lamellaElement || !(lamellaElement instanceof HTMLElement)) {
                throw Error(`Check lamella id - ${lamellaId}`);
            }

            const labelElement = lamellaElement.children[0];

            if (!labelElement || !(labelElement instanceof HTMLElement)) {
                throw Error("Label element is not HTMLElement");
            }

            const degree = getRotateDegreeFromTransformString(
                lamellaElement.style.transform,
            );
            const labelDegree = getRotateDegreeFromTransformString(
                labelElement.style.transform,
            );

            if (isLamellasShifted) {
                lamellaElement.style.transform = getRotateTransformStyle(
                    degree - this.LAMELLAS_DEGREE_SHIFT,
                );
                labelElement.style.transform = getRotateTransformStyle(
                    labelDegree + this.LAMELLAS_DEGREE_SHIFT,
                );
            } else {
                lamellaElement.style.transform = getRotateTransformStyle(
                    degree + this.LAMELLAS_DEGREE_SHIFT,
                );
                labelElement.style.transform = getRotateTransformStyle(
                    labelDegree - this.LAMELLAS_DEGREE_SHIFT,
                );
            }
        });
    }
}
