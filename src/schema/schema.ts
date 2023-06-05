import "./schema.scss";

import { SelectedSettingsType } from "../types.ts";
import { Axis } from "./components/Axis.ts";
import { Slot } from "./components/Slot.ts";

export class Schema {
    private readonly SCHEMA_CONTAINER_ID = "schema";

    private readonly AxisClass = new Axis();
    private readonly SlotClass = new Slot();

    constructor() {
        this.AxisClass.drawAxis(this.SCHEMA_CONTAINER_ID);
    }

    public drawSchema(schemaSettings: SelectedSettingsType) {
        const slotContainer = this.SlotClass.getContainerWithSlotList(
            Number(schemaSettings.slot),
        );

        this.addElementsIntoSchema(slotContainer);
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
