import { LamellaPositionType, WindingDirectionType } from "../form/types.ts";

export type DrawSlotsPropsType = {
    slot: string;
    windingCount: string;
};

export type DrawLamellasPropsType = {
    lamella: string;
    lamellaPosition: LamellaPositionType;
};

export type DrawWiringArrowsType = {
    slot: number;
    wiringStep: string;
    windingDirection: WindingDirectionType;
};
