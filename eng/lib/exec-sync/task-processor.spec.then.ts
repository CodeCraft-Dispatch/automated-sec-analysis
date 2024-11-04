
export class TaskProcessorSpecThen {
    constructor(private readonly execSyncBuilder) {

    }

    public thenIsTestIsCalled() {
        expect(this.execSyncBuilder.isTest).toHaveBeenCalled();
    }

    public thenExecuteCalled() {
        expect(this.execSyncBuilder.execute).toHaveBeenCalled();
    }

    public thenProcessIsCalledWith(command: string) {
        expect(this.execSyncBuilder.process).toHaveBeenCalledWith(command);
    }

    public thenArgIsCalledWith(arg: string) {
        expect(this.execSyncBuilder.arg).toHaveBeenCalledWith(arg);
    }

    public thenStdioIsCalledWith(input: string, output: string, error: string) {
        expect(this.execSyncBuilder.input).toHaveBeenCalledWith(input);
        expect(this.execSyncBuilder.output).toHaveBeenCalledWith(output);
        expect(this.execSyncBuilder.error).toHaveBeenCalledWith(error);
    }
}