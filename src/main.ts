import "./styles/normalize.css";
import "./styles/style.css";

import { FormSettingsStateType } from "./form/types.ts";
import { Schema } from "./schema/schema.ts";
import { Form } from "./form/form.ts";

class ElectricalMotorWiring {
    private readonly form: Form = new Form();
    private readonly schema: Schema = new Schema();

    constructor() {
        this.form.addEventListenersToFormElement({
            drawSlots: () => this.drawSlots(),
            drawLamellas: () => this.drawLamellas(),
            changeLamellasPosition: () => this.changeLamellasPosition(),
        });
        this.drawSchema(this.form.getFormValue());
    }

    private drawSchema(formValue: FormSettingsStateType) {
        this.schema.drawSchema(formValue);
    }

    private drawSlots() {
        const { slot, windingCount } = this.form.getFormValue();
        this.schema.drawSlots({ slot, windingCount });
    }

    private drawLamellas() {
        const { lamellaPosition, lamella } = this.form.getLamellaValues();
        this.schema.drawLamellas({ lamella, lamellaPosition });
    }

    private changeLamellasPosition() {
        const { lamellaPosition } = this.form.getLamellaValues();
        this.schema.changeLamellaPosition(lamellaPosition);
    }
}

new ElectricalMotorWiring();
