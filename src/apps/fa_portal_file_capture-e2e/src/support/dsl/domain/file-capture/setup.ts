import { IDslContext } from "../../infrastructure/dsl-context";
import { FileCaptureDomainKeys } from "./keys";

export class FileCaptureGivenDomain {
    constructor(private readonly context: IDslContext) { }

    public targetFileCaptureTimingIsDefined() {
        console.log('Given that the Target File Capture Timing is defined');
        this.context[FileCaptureDomainKeys.targetFileCaptureTiming] = 'Every Saturday at 5 am. CST';
    }
}