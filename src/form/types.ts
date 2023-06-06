export type LamellaPositionType = "combined" | "notCombined";
export type WindingDirectionType = "direct" | "reverse";
export type WiringDirectionType = "right" | "left";

export type SettingsFieldType =
    | "slot"
    | "lamella"
    | "lamellaPosition"
    | "windingDirection"
    | "wiringDirection";

export type SettingsValueType =
    | string
    | LamellaPositionType
    | WindingDirectionType
    | WiringDirectionType;

export type FormSettingsStateType = Record<
    SettingsFieldType,
    SettingsValueType
>;
