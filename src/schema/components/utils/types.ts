import { ElementCenteredCoordsType } from "../../../shared/getElementCentralCoordsById.ts";

export type CircledElementConstructorType = {
    elementWidth: number;
    elementHeight: number;
    elementIdTitlePart: string;
    containerId: string;
};

type OptionsType = {
    additionalAngle?: number;
};

export type GetContainerWithElementsListType = {
    elementCount: number;
    options?: OptionsType;
};

export type CreateElementPropsType = {
    index: number;
    elementCount: number;
    elementContainerCenterCoords: ElementCenteredCoordsType;
    options?: OptionsType;
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
