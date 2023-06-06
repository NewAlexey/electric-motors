import "./form.scss";

import {
    FormSettingsStateType,
    LamellaPositionType,
    SettingsFieldType,
    SettingsValueType,
    WindingDirectionType,
    WiringDirectionType,
} from "./types.ts";

const SETTING_ELEMENTS_IDS: Record<SettingsFieldType, string> = {
    slot: "slot",
    lamella: "lamella",
    lamellaPosition: "lamella-position",
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

    private formSettingsState: FormSettingsStateType = {
        slot: "0",
        lamella: "0",
        lamellaPosition: "combined",
        windingDirection: "direct",
        wiringDirection: "right",
    };

    constructor() {
        this.setInitialFormState();
    }

    public getSettingsValue(): FormSettingsStateType {
        return this.formSettingsState;
    }

    public addEventListenersToFormElement(
        callback: (formState: FormSettingsStateType) => void,
    ) {
        const entries = Object.entries<SettingsValueType>(SETTING_ELEMENTS_IDS);

        entries.forEach((entry) => {
            const field = entry[0] as SettingsFieldType;
            const id = entry[1];

            const element = this.getElementById<
                HTMLInputElement | HTMLSelectElement
            >(id);

            element?.addEventListener("input", (event: Event) => {
                if (
                    event.target instanceof HTMLInputElement ||
                    event.target instanceof HTMLSelectElement
                ) {
                    this.formSettingsState[field] = event.target
                        .value as SettingsValueType;

                    callback(this.getSettingsValue());
                }
            });
        });
    }

    private setInitialFormState() {
        const slotElement = this.getElementById<HTMLInputElement>(
            this.SLOT_ELEMENT_ID,
        );
        const lamellaElement = this.getElementById<HTMLInputElement>(
            this.LAMELLA_ELEMENT_ID,
        );
        const lamellaPositionElement = this.getElementById<HTMLSelectElement>(
            this.LAMELLA_POSITION_ELEMENT_ID,
        );
        const windingDirectionElement = this.getElementById<HTMLSelectElement>(
            this.WINDING_DIRECTION_ELEMENT_ID,
        );
        const wiringDirectionElement = this.getElementById<HTMLSelectElement>(
            this.WIRING_DIRECTION_ELEMENT_ID,
        );

        if (
            !slotElement ||
            !lamellaElement ||
            !lamellaPositionElement ||
            !windingDirectionElement ||
            !wiringDirectionElement
        ) {
            return;
        }

        this.formSettingsState.slot = slotElement.value;
        this.formSettingsState.lamella = lamellaElement.value;
        this.formSettingsState.lamellaPosition =
            lamellaPositionElement.value as LamellaPositionType;
        this.formSettingsState.windingDirection =
            windingDirectionElement.value as WindingDirectionType;
        this.formSettingsState.wiringDirection =
            wiringDirectionElement.value as WiringDirectionType;
    }

    private getElementById<T extends Element>(id: string): T | null {
        return document.querySelector(`#${id}`);
    }
}
