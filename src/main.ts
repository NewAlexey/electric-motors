import "./styles/normalize.css";
import "./styles/style.css";

import { FormSettingsStateType } from "./form/types.ts";
import { Schema } from "./schema/schema.ts";
import { Form } from "./form/form.ts";

class ElectricalMotorWiring {
    private readonly Form: Form = new Form();
    private readonly Schema: Schema = new Schema();

    constructor() {
        this.Form.addEventListenersToFormElement({
            drawSlots: () => this.drawSlots(),
            drawLamellas: () => this.drawLamellas(),
            changeLamellasPosition: () => this.changeLamellasPosition(),
            changeSlotSectorLines: () => this.changeSlotSectorCount(),
        });
        this.drawSchema(this.Form.getFormValue());
    }

    private drawSchema(formValue: FormSettingsStateType) {
        this.Schema.drawSchema(formValue);
    }

    private drawSlots() {
        const { slot, windingCount } = this.Form.getFormValue();
        this.Schema.drawSlots({ slot, windingCount });
    }

    private drawLamellas() {
        const { lamellaPosition, lamella } = this.Form.getLamellaValues();
        this.Schema.drawLamellas({ lamella, lamellaPosition });
    }

    private changeLamellasPosition() {
        const { lamellaPosition } = this.Form.getLamellaValues();
        this.Schema.changeLamellaPosition(lamellaPosition);
    }

    private changeSlotSectorCount() {
        const { windingCount } = this.Form.getFormValue();
        this.Schema.changeSlotSectorCount(windingCount);
    }
}

new ElectricalMotorWiring();
