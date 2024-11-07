import { TaskCommandProcessor } from './task-command-processor';

describe('TaskCommandProcessor', () => {
    let tcp: TaskCommandProcessor;
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
        tcp = new TaskCommandProcessor(execSyncBuilder, taskValidator);
    });

    describe('processCommand', () => {
        it('should process command', () => {
            taskValidator.hasCommand.mockReturnValue(true);
            tcp.processCommand({ command: 'echo' });
            expect(execSyncBuilder.process).toHaveBeenCalledWith('echo');
        });

        it('should not process command', () => {
            taskValidator.hasCommand.mockReturnValue(false);
            tcp.processCommand({ command: 'echo' });
            expect(execSyncBuilder.process).not.toHaveBeenCalled();
        });
    });
});