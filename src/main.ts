import "./styles/normalize.css";
import "./styles/style.css";
import {
    LamellaPositionType,
    SelectedSettingsType,
    WindingDirectionType,
    WiringDirectionType,
} from "./types.ts";

const SETTING_ELEMENTS_IDS = {
    slot: "slot",
    lamella: "lamella",
    lamellaPosition: "lamella-position",
    windingDirection: "winding-direction",
    wiringDirection: "wiring-direction",
};

class ElectricalMotorWiring {
    private readonly SLOT_ELEMENT_ID = SETTING_ELEMENTS_IDS.slot;
    private readonly LAMELLA_ELEMENT_ID = SETTING_ELEMENTS_IDS.lamella;
    private readonly LAMELLA_POSITION_ELEMENT_ID =
        SETTING_ELEMENTS_IDS.lamellaPosition;
    private readonly WINDING_DIRECTION_ELEMENT_ID =
        SETTING_ELEMENTS_IDS.windingDirection;
    private readonly WIRING_DIRECTION_ELEMENT_ID =
        SETTING_ELEMENTS_IDS.wiringDirection;

    private selectedSettings: SelectedSettingsType = {
        slot: "0",
        lamella: "0",
        lamellaPosition: "combined",
        windingDirection: "direct",
        wiringDirection: "right",
    };

    constructor() {
        this.start();
    }

    public start() {
        this.setInitialSelectedSettings();
        this.addEventListenersToElement();
    }

    private addEventListenersToElement() {
        const entries = Object.entries(SETTING_ELEMENTS_IDS);

        entries.forEach((entry) => {
            const field = entry[0] as keyof SelectedSettingsType;
            const id = entry[1];

            const element = this.getElementById<
                HTMLInputElement | HTMLSelectElement
            >(id);

            element?.addEventListener("input", (event: Event) => {
                if (
                    event.target instanceof HTMLInputElement ||
                    event.target instanceof HTMLSelectElement
                ) {
                    //TODO remove ts ignore
                    // @ts-ignore
                    this.selectedSettings[field] = event.target.value as
                        | string
                        | LamellaPositionType
                        | WindingDirectionType
                        | WiringDirectionType;

                    console.log("selectedValue", this.selectedSettings);
                }
            });
        });
    }

    private setInitialSelectedSettings() {
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

        this.selectedSettings.slot = slotElement.value;
        this.selectedSettings.lamella = lamellaElement.value;
        this.selectedSettings.lamellaPosition =
            lamellaPositionElement.value as LamellaPositionType;
        this.selectedSettings.windingDirection =
            windingDirectionElement.value as WindingDirectionType;
        this.selectedSettings.wiringDirection =
            wiringDirectionElement.value as WiringDirectionType;
    }

    private getElementById<T extends Element>(id: string): T | null {
        return document.querySelector(`#${id}`);
    }
}

new ElectricalMotorWiring();
