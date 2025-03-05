import { IDslContext } from "../../infrastructure/dsl-context";
import { fileCaptureHeaderKey, targetFileCaptureTimingKey } from "./keys";

export class FileCaptureGivenDomain {
    constructor(private readonly context: IDslContext) { }

    public fileCaptureHeaderIsDefined() {
        console.log('Given that the File Capture Header is defined');
        this.context[fileCaptureHeaderKey] = 'File Capture';
    }

    public targetFileCaptureTimingIsDefined() {
        console.log('Given that the Target File Capture Timing is defined');
        this.context[targetFileCaptureTimingKey] = 'Every Saturday at 5 am. CST';
    }
}