import "./form.scss";

import {
    EventListenerProps,
    FormSettingsStateType,
    LamellaPositionType,
    LamellaTypes,
    SettingsFieldType,
    SettingsValueType,
    WindingDirectionType,
    WiringDirectionType,
} from "./types.ts";
import { getElementById } from "../shared/getElementById.ts";

const SETTING_ELEMENTS_IDS: Record<SettingsFieldType, string> = {
    slot: "slot",
    lamella: "lamella",
    lamellaPosition: "lamella-position",
    windingCount: "winding-count",
    windingDirection: "winding-direction",
    wiringDirection: "wiring-direction",
};

export class Form {
    private readonly SLOT_ELEMENT_ID = SETTING_ELEMENTS_IDS.slot;
    private readonly LAMELLA_ELEMENT_ID = SETTING_ELEMENTS_IDS.lamella;
    private readonly LAMELLA_POSITION_ELEMENT_ID =
        SETTING_ELEMENTS_IDS.lamellaPosition;
    private readonly WINDING_DIRECTION_ELEMENT_ID =
        SETTING_ELEMENTS_IDS.windingDirection;
    private readonly WIRING_DIRECTION_ELEMENT_ID =
        SETTING_ELEMENTS_IDS.wiringDirection;
    private readonly WINDING_COUNT_ELEMENT_ID =
        SETTING_ELEMENTS_IDS.windingCount;
    /**
     * Типы данных значений объекта формы настроек.
     *
     * @property slot - количество `пазов`.
     * @property lamella - количество `ламелей`.
     * @property lamellaPosition - позиция ламелей (совпадают или нет).
     * @property windingCount - количество обмоток.
     * @property windingDirection - направление обмотки.
     * @property wiringDirection - направление разводки.
     */
    private formSettingsState: FormSettingsStateType = {
        slot: "0",
        lamella: "0",
        lamellaPosition: "combined",
        windingCount: "0",
        windingDirection: "direct",
        wiringDirection: "right",
    };

    constructor() {
        this.setInitialFormState();
    }

    public getFormValue(): FormSettingsStateType {
        return this.formSettingsState;
    }

    public getLamellaValues(): LamellaTypes {
        const { lamellaPosition, lamella } = this.getFormValue();

        return {
            lamella,
            lamellaPosition: lamellaPosition as LamellaPositionType,
        };
    }

    public addEventListenersToFormElement({
        drawSlots,
        drawLamellas,
        changeLamellasPosition,
    }: EventListenerProps) {
        const entries = Object.entries<SettingsValueType>(SETTING_ELEMENTS_IDS);

        entries.forEach((entry) => {
            const field = entry[0] as SettingsFieldType;
            const id = entry[1];

            const element = getElementById(id);

            element.addEventListener("input", (event: Event) => {
                if (
                    event.target instanceof HTMLInputElement ||
                    event.target instanceof HTMLSelectElement
                ) {
                    this.formSettingsState[field] = event.target
                        .value as SettingsValueType;

                    switch (field) {
                        case "slot": {
                            drawSlots();

                            break;
                        }

                        case "lamella": {
                            drawLamellas();

                            break;
                        }

                        case "lamellaPosition": {
                            changeLamellasPosition();

                            break;
                        }
                    }
                }
            });
        });
    }

    private setInitialFormState() {
        const slotElement = getElementById(
            this.SLOT_ELEMENT_ID,
        ) as HTMLInputElement;
        const lamellaElement = getElementById(
            this.LAMELLA_ELEMENT_ID,
        ) as HTMLInputElement;
        const lamellaPositionElement = getElementById(
            this.LAMELLA_POSITION_ELEMENT_ID,
        ) as HTMLSelectElement;
        const windingDirectionElement = getElementById(
            this.WINDING_DIRECTION_ELEMENT_ID,
        ) as HTMLSelectElement;
        const wiringDirectionElement = getElementById(
            this.WIRING_DIRECTION_ELEMENT_ID,
        ) as HTMLSelectElement;

        const windingCountElement = getElementById(
            this.WINDING_COUNT_ELEMENT_ID,
        ) as HTMLSelectElement;

        this.formSettingsState.slot = slotElement.value;
        this.formSettingsState.lamella = lamellaElement.value;
        this.formSettingsState.lamellaPosition =
            lamellaPositionElement.value as LamellaPositionType;
        this.formSettingsState.windingDirection =
            windingDirectionElement.value as WindingDirectionType;
        this.formSettingsState.wiringDirection =
            wiringDirectionElement.value as WiringDirectionType;
        this.formSettingsState.windingCount = windingCountElement.value;
    }
}
