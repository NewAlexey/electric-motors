import "./schema.scss";

import {
    FormSettingsStateType,
    LamellaPositionType,
    WiringDirectionType,
} from "../form/types.ts";
import { Axis } from "./components/axis/Axis.ts";
import { Lamella } from "./components/lamella/Lamella.ts";
import { Slot } from "./components/slot/Slot.ts";
import {
    DrawLamellasPropsType,
    DrawSlotsPropsType,
} from "./components/type.ts";
import { getElementById } from "../shared/getElementById.ts";
import { WiringArrow } from "./components/wiring/WiringArrow.ts";

export class Schema {
    private readonly SCHEMA_CONTAINER_ID = "schema";

    private readonly Axis = new Axis();
    private readonly Slot = new Slot();
    private readonly Lamella = new Lamella();
    private readonly WiringArrow = new WiringArrow();

    constructor() {
        this.Axis.drawAxis(this.SCHEMA_CONTAINER_ID);
    }

    public drawSchema(schemaSettings: FormSettingsStateType) {
        const {
            slot,
            windingCount,
            lamella,
            lamellaPosition,
            wiringDirection,
        } = schemaSettings;

        this.drawSlots({ slot, windingCount });
        this.drawLamellas({
            lamella,
            lamellaPosition: lamellaPosition as LamellaPositionType,
        });
        this.drawWiringDirectionArrow(wiringDirection);
    }

    public drawSlots({ slot, windingCount }: DrawSlotsPropsType) {
        const slotContainer = this.Slot.getContainerWithSlotList({
            slotCount: Number(slot),
            windingCount: Number(windingCount),
        });
        this.addElementsIntoSchema(slotContainer);
    }

    public drawLamellas({ lamella, lamellaPosition }: DrawLamellasPropsType) {
        const lamellaContainer = this.Lamella.getContainerWithLamellaList({
            lamellaPosition,
            lamellaCount: Number(lamella),
        });
        this.addElementsIntoSchema(lamellaContainer);
    }

    public changeLamellaPosition(lamellaPosition: LamellaPositionType) {
        this.Lamella.changeLamellaPosition(lamellaPosition);
    }

    public changeSlotSectorCount(windingCount: string) {
        this.Slot.changeSectorCount(Number(windingCount));
    }

    public drawWiringDirectionArrow(wiringDirection: string) {
        this.WiringArrow.drawDirectionArrow(
            wiringDirection as WiringDirectionType,
        );
    }

    private addElementsIntoSchema(element: Element) {
        const schemaContainer = getElementById(this.SCHEMA_CONTAINER_ID);

        schemaContainer.appendChild(element);
    }
}
