import { TaskArgsProcessor } from './task-args-processor';

describe('TaskArgsProcessor', () => {
    let taskArgsProcessor: TaskArgsProcessor;
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
        taskArgsProcessor = new TaskArgsProcessor(execSyncBuilder, taskValidator);
    });

    describe('processArgs', () => {
        it('should process args', () => {
            taskValidator.hasArgs.mockReturnValue(true);
            taskArgsProcessor.processArgs({ command: 'hello', args: ['hello'] });
            expect(execSyncBuilder.arg).toHaveBeenCalledWith('hello');
        });

        it('should not process args', () => {
            taskValidator.hasArgs.mockReturnValue(false);
            taskArgsProcessor.processArgs({ command: 'hello', args: ['hello'] });
            expect(execSyncBuilder.arg).not.toHaveBeenCalled();
        });
    });
});