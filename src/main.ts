import "./styles/normalize.css";
import "./styles/style.css";

import { FormSettingsStateType } from "./form/types.ts";
import { Schema } from "./schema/schema.ts";
import { Form } from "./form/form.ts";

class ElectricalMotorWiring {
    private readonly form: Form = new Form();
    private readonly schema: Schema = new Schema();

    constructor() {
        this.form.addEventListenersToFormElement(() =>
            this.drawSchema(this.form.getSettingsValue()),
        );
        this.drawSchema(this.form.getSettingsValue());
    }

    private drawSchema(formValue: FormSettingsStateType) {
        this.schema.drawSchema(formValue);
    }
}

new ElectricalMotorWiring();
