import "./lamella.scss";
import styles from "./variables.scss?inline";

import { getValueFromScssExport } from "../../../shared/getValueFromScssExport.ts";
import { CircledElement } from "../utils/CircledElement.ts";
import { GetContainerWithLamellaListType } from "./type.ts";

const LAMELLA_WIDTH_TITLE = "lamellaWidth";
const LAMELLA_HEIGHT_TITLE = "lamellaHeight";
const LAMELLA_CONTAINER_ID = "lamella__container";
const LAMELLA_ID_TITLE_PART = "lamella_";

export class Lamella extends CircledElement {
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
    }: GetContainerWithLamellaListType): HTMLElement {
        return this.getContainerWithElementList({ elementCount: lamellaCount });
    }
}
