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
    | LamellaPositionType
    | WindingDirectionType
    | WiringDirectionType
    | string;

/**
 * Тип данных объекта формы.
 */
export type FormSettingsStateType = Record<
    SettingsFieldType,
    SettingsValueType
>;

export type EventListenerProps = {
    drawSlots: () => void;
    drawLamellas: () => void;
    changeLamellasPosition: () => void;
};

export type LamellaTypes = {
    lamella: string;
    lamellaPosition: LamellaPositionType;
};
