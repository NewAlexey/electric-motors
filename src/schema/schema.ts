import "./schema.scss";

import { FormSettingsStateType } from "../form/types.ts";
import { Axis } from "./components/axis/Axis.ts";
import { Lamella } from "./components/lamella/Lamella.ts";
import { Slot } from "./components/slot/Slot.ts";

export class Schema {
    private readonly SCHEMA_CONTAINER_ID = "schema";

    private readonly AxisClass = new Axis();
    private readonly SlotClass = new Slot();
    private readonly LamellaClass = new Lamella();

    constructor() {
        this.AxisClass.drawAxis(this.SCHEMA_CONTAINER_ID);
    }

    public drawSchema(schemaSettings: FormSettingsStateType) {
        const { slot, windingCount, lamella } = schemaSettings;

        const slotContainer = this.SlotClass.getContainerWithSlotList({
            slotCount: Number(slot),
            windingCount: Number(windingCount),
        });

        const lamellaContainer = this.LamellaClass.getContainerWithLamellaList({
            lamellaCount: Number(lamella),
        });

        this.addElementsIntoSchema(slotContainer);
        this.addElementsIntoSchema(lamellaContainer);
    }

    private addElementsIntoSchema(element: Element) {
        const schemaContainer = this.getSchemaContainer();

        schemaContainer.appendChild(element);
    }

    private getSchemaContainer() {
        const schemaContainer = document.getElementById(
            this.SCHEMA_CONTAINER_ID,
        );

        if (!schemaContainer) {
            throw Error("Check Schema Container Element.");
        }

        return schemaContainer;
    }
}
