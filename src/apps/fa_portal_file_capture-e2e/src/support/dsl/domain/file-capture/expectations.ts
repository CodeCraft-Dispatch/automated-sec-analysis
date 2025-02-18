import { getTargetFileCaptureTiming } from "../../drivers/file-capture/file-capture";
import { IDslContext } from "../../infrastructure/dsl-context";
import { FileCaptureDomainKeys } from "./keys";

export class FileCaptureThenDomain {
    constructor(private readonly context: IDslContext) { }

    public targetFileCaptureTimingIsProvided() {
        console.log('Then the Target File Capture Timing should be provided');
        const timing = this.context[FileCaptureDomainKeys.targetFileCaptureTiming] as string;
        const targetFileCaptureTimingElement = getTargetFileCaptureTiming();
        targetFileCaptureTimingElement.should('have.text', timing);
    }
}