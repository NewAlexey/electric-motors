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
    | "wiringStep"
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
    changeSlotCount: () => void;
    changeLamellaCount: () => void;
    changeWiringStep: () => void;
    changeLamellasPosition: () => void;
    changeSlotSectorLines: () => void;
    changeWiringDirectionArrow: () => void;
};

export type LamellaTypes = {
    lamella: string;
    lamellaPosition: LamellaPositionType;
};
