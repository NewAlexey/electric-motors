import "./schema.scss";

import { FormSettingsStateType, LamellaPositionType } from "../form/types.ts";
import { Axis } from "./components/axis/Axis.ts";
import { Lamella } from "./components/lamella/Lamella.ts";
import { Slot } from "./components/slot/Slot.ts";
import {
    DrawLamellasPropsType,
    DrawSlotsPropsType,
} from "./components/type.ts";
import { getElementById } from "../shared/getElementById.ts";

export class Schema {
    private readonly SCHEMA_CONTAINER_ID = "schema";

    private readonly AxisClass = new Axis();
    private readonly SlotClass = new Slot();
    private readonly LamellaClass = new Lamella();

    constructor() {
        this.AxisClass.drawAxis(this.SCHEMA_CONTAINER_ID);
    }

    public drawSchema(schemaSettings: FormSettingsStateType) {
        const { slot, windingCount, lamella, lamellaPosition } = schemaSettings;

        this.drawSlots({ slot, windingCount });
        this.drawLamellas({
            lamella,
            lamellaPosition: lamellaPosition as LamellaPositionType,
        });
    }

    public drawSlots({ slot, windingCount }: DrawSlotsPropsType) {
        const slotContainer = this.SlotClass.getContainerWithSlotList({
            slotCount: Number(slot),
            windingCount: Number(windingCount),
        });
        this.addElementsIntoSchema(slotContainer);
    }

    public drawLamellas({ lamella, lamellaPosition }: DrawLamellasPropsType) {
        const lamellaContainer = this.LamellaClass.getContainerWithLamellaList({
            lamellaPosition,
            lamellaCount: Number(lamella),
        });
        this.addElementsIntoSchema(lamellaContainer);
    }

    public changeLamellaPosition(lamellaPosition: LamellaPositionType) {
        this.LamellaClass.changeLamellaPosition(lamellaPosition);
    }

    private addElementsIntoSchema(element: Element) {
        const schemaContainer = getElementById(this.SCHEMA_CONTAINER_ID);

        schemaContainer.appendChild(element);
    }
}
