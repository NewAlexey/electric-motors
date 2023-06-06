export type LamellaPositionType = "combined" | "notCombined";
export type WindingDirectionType = "direct" | "reverse";
export type WiringDirectionType = "right" | "left";

/**
 * Названия полей объекта формы настроек.
 */
export type SettingsFieldType =
    | "slot"
    | "lamella"
    | "lamellaPosition"
    | "windingDirection"
    | "wiringDirection"
    | "windingCount";

/**
 * Типы данных значений объекта формы настроек.
 */
export type SettingsValueType =
    | string
    | LamellaPositionType
    | WindingDirectionType
    | WiringDirectionType;

/**
 * Тип данных объекта формы.
 */
export type FormSettingsStateType = Record<
    SettingsFieldType,
    SettingsValueType
>;
