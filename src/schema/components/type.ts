import { LamellaPositionType } from "../../form/types.ts";

export type DrawSlotsPropsType = {
    slot: string;
    windingCount: string;
};

export type DrawLamellasPropsType = {
    lamella: string;
    lamellaPosition: LamellaPositionType;
};
