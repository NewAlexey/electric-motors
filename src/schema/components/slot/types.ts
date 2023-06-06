import { ElementCenteredCoordsType } from "../../../shared/getElementCentralCoordsById.ts";

export type DrawSlotPropsType = {
    slotCount: number;
    windingCount: number;
};

export type createSlotElementType = {
    slotElement: HTMLDivElement;
    rotateAngle: number;
    serialNumber: number;
};

export type createSlotElementPropsType = {
    index: number;
    slotCount: number;
    slotContainerCenterCoords: ElementCenteredCoordsType;
};

export type createSlotElementStylesType = {
    id: string;
    rotateAngle: number;
    serialNumber: number;
    topCoordinate: string;
    leftCoordinate: string;
    transformOriginStyle: string;
};
