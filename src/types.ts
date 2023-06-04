export type LamellaPositionType = "combined" | "notCombined";
export type WindingDirectionType = "direct" | "reverse";
export type WiringDirectionType = "right" | "left";

export type SelectedSettingsType = {
    slot: string;
    lamella: string;
    lamellaPosition: LamellaPositionType;
    windingDirection: WindingDirectionType;
    wiringDirection: WiringDirectionType;
};
