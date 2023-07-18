import "./styles/normalize.css";
import "./styles/style.scss";

import { FormSettingsStateType, WindingDirectionType } from "./form/types.ts";
import { Schema } from "./schema/schema.ts";
import { Form } from "./form/form.ts";

class ElectricalMotorWiring {
    private readonly Form: Form = new Form();
    private readonly Schema: Schema = new Schema();

    constructor() {
        this.Form.addEventListenersToFormElement({
            changeSlotCount: () => {
                this.changeSlotCount();
                this.changeWiringStep();
            },
            changeWiringStep: () => this.changeWiringStep(),
            changeLamellaCount: () => this.changeLamellaCount(),
            changeSlotSectorLines: () => this.changeSlotSectorCount(),
            changeLamellasPosition: () => this.changeLamellasPosition(),
            changeWindingDirection: () => this.changeWindingDirection(),
            changeWiringDirectionArrow: () => this.changeWiringDirectionArrow(),
        });
        this.drawSchema(this.Form.getFormValue());
    }

    private drawSchema(formValue: FormSettingsStateType) {
        this.Schema.drawSchema(formValue);
    }

    private changeSlotCount() {
        const { slot, windingCount } = this.Form.getFormValue();
        this.Schema.drawSlots({ slot, windingCount });
    }

    private changeLamellaCount() {
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

    private changeWiringDirectionArrow() {
        const { wiringDirection } = this.Form.getFormValue();
        this.Schema.drawWiringDirectionArrow(wiringDirection);
    }

    private changeWiringStep() {
        const { wiringStep, windingDirection, slot } = this.Form.getFormValue();

        this.Schema.changeWiringStep({
            wiringStep,
            slot: Number(slot),
            windingDirection: windingDirection as WindingDirectionType,
        });
    }

    private changeWindingDirection() {
        const { wiringStep, windingDirection, slot } = this.Form.getFormValue();

        this.Schema.changeWiringStep({
            wiringStep,
            slot: Number(slot),
            windingDirection: windingDirection as WindingDirectionType,
        });
    }
}

new ElectricalMotorWiring();
