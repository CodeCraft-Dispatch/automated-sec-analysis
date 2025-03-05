import { getFileCaptureHeader, getTargetFileCaptureTiming } from "../../drivers/file-capture/file-capture";
import { IDslContext } from "../../infrastructure/dsl-context";
import { fileCaptureHeaderKey, targetFileCaptureTimingKey } from "./keys";

export class FileCaptureThenDomain {
    constructor(private readonly context: IDslContext) { }

    public fileCaptureHeaderIsProvided() {
        console.log('Then the File Capture Header should be provided');
        const expectedHeaderText = this.context[fileCaptureHeaderKey];
        const fileCaptureHeaderElement = getFileCaptureHeader();
        fileCaptureHeaderElement.should('be.visible');
        fileCaptureHeaderElement.should('have.text', expectedHeaderText);
    }

    public targetFileCaptureTimingIsProvided() {
        console.log('Then the Target File Capture Timing should be provided');
        const timing = this.context[targetFileCaptureTimingKey] as string;
        const targetFileCaptureTimingElement = getTargetFileCaptureTiming();
        targetFileCaptureTimingElement.should('be.visible');
        targetFileCaptureTimingElement.should('have.text', timing);
    }
}