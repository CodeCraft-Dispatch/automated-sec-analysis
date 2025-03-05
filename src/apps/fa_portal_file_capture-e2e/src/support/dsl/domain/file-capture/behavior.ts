import { navigateToFileCapture } from "../../drivers/file-capture/file-capture";
import { IDslContext } from "../../infrastructure/dsl-context";
import { fileCaptureRoleKey } from "./keys";

export class FileCaptureWhenDomain {
    constructor(private readonly context: IDslContext) { }

    public accessesFileCapture() {
        console.log('When a Financial Analyst accesses File Capture');
        this.context[fileCaptureRoleKey] = 'FinancialAnalyst';
        navigateToFileCapture();
    }
}