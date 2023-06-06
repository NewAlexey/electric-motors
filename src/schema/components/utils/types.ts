import { ElementCenteredCoordsType } from "../../../shared/getElementCentralCoordsById.ts";

export type CircledElementConstructorType = {
    elementWidth: number;
    elementHeight: number;
    elementIdTitlePart: string;
    containerId: string;
};

export type GetContainerWithElementsListType = {
    elementCount: number;
};

export type CreateElementPropsType = {
    index: number;
    elementCount: number;
    elementContainerCenterCoords: ElementCenteredCoordsType;
};

export type CreateElementType = {
    element: HTMLDivElement;
    rotateAngle: number;
    serialNumber: number;
};

export type CreateElementStylesType = {
    id: string;
    rotateAngle: number;
    serialNumber: number;
    topCoordinate: string;
    leftCoordinate: string;
    transformOriginStyle: string;
};

export type CreateSerialNumberElementType = {
    serialNumber: number;
    rotateAngle: number;
};
