export class Axis {
    private readonly AXIS_X_ELEMENT_ID = "axis-X";
    private readonly AXIS_Y_ELEMENT_ID = "axis-Y";

    public drawAxis(schemaContainerId: string): void {
        const axisX = document.getElementById(this.AXIS_X_ELEMENT_ID);
        const axisY = document.getElementById(this.AXIS_Y_ELEMENT_ID);

        const schemaContainer = document.getElementById(schemaContainerId);

        if (!axisX || !axisY || !schemaContainer) {
            return;
        }

        const schemaRect = schemaContainer.getBoundingClientRect();

        axisX.style.top = `${schemaRect.height / 2}px`;
        axisY.style.left = `${schemaRect.width / 2}px`;
    }
}
