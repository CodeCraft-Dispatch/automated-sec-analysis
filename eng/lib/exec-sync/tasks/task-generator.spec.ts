import { TaskGenerator } from './task-generator';

describe('TaskGenerator', () => {
    it('should create a task with a command', () => {
        const task = new TaskGenerator()
            .command('echo')
            .build();

        expect(task.command).toBe('echo');
    });

    it('should create a task with a command and arguments', () => {
        const task = new TaskGenerator()
            .command('echo')
            .arg('hello')
            .arg('world')
            .build();

        expect(task.command).toBe('echo');
        expect(task.args).toEqual(['hello', 'world']);
    });

    it('should overwrite the command when calling command multiple times', () => {
        const task = new TaskGenerator()
            .command('echo')
            .command('echo2')
            .build();

        expect(task.command).toBe('echo2');
    });
});