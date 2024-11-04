import { TaskStdioProcessor } from './task-stdio-processor';

describe('TaskStdioProcessor', () => {
    let taskStdioProcessor: TaskStdioProcessor;
    let execSyncBuilder;
    let taskValidator;

    beforeEach(() => {
        execSyncBuilder = {
            process: jest.fn(),
            arg: jest.fn(),
            input: jest.fn(),
            output: jest.fn(),
            error: jest.fn(),
            execute: jest.fn(),
            isTest: jest.fn(),
        };
        taskValidator = {
            hasCommand: jest.fn(),
            hasArgs: jest.fn(),
            hasStdio: jest.fn(),
        };
        taskStdioProcessor = new TaskStdioProcessor(execSyncBuilder, taskValidator);
    });

    describe('processStdio', () => {
        it('should process stdio', () => {
            taskValidator.hasStdio.mockReturnValue(true);
            taskStdioProcessor.processStdio({ command: 'hello', stdio: { input: 'hello', output: 'hello', error: 'hello' } });
            expect(execSyncBuilder.input).toHaveBeenCalledWith('hello');
            expect(execSyncBuilder.output).toHaveBeenCalledWith('hello');
            expect(execSyncBuilder.error).toHaveBeenCalledWith('hello');
        });

        it('should not process stdio', () => {
            taskValidator.hasStdio.mockReturnValue(false);
            taskStdioProcessor.processStdio({ command: 'hello', stdio: { input: 'hello', output: 'hello', error: 'hello' } });
            expect(execSyncBuilder.input).not.toHaveBeenCalled();
            expect(execSyncBuilder.output).not.toHaveBeenCalled();
            expect(execSyncBuilder.error).not.toHaveBeenCalled();
        });
    });
});