import { CommandBuilder } from './command-builder';

describe('commandBuilder', () => {
  it('should return a command object with a build method that returns a string', () => {
    const command = new CommandBuilder();
    expect(command.build()).toBe('');
  });
  describe('process()', () => {
    it('should allow providing a string with the process value', () => {
      const command = new CommandBuilder();
      command.process('git');
      expect(command.build()).toBe('git');
    });
    it('should use the last set value for process when called twice', () => {
      const command = new CommandBuilder();
      command.process('git').process('npm');
      expect(command.build()).toBe('npm');
    });
    describe('arg()', () => {
      it('should allow providing an arg value', () => {
        const command = new CommandBuilder();
        command.process('git').arg('rev-parse');
        expect(command.build()).toBe('git rev-parse');
      });
      it('should allow providing two arg values when called twice', () => {
        const command = new CommandBuilder();
        command.process('git').arg('rev-parse').arg('--abbrev-ref');
        expect(command.build()).toBe('git rev-parse --abbrev-ref');
      });
      it('should allow providing three arg values when called three times', () => {
        const command = new CommandBuilder();
        command.process('git').arg('rev-parse').arg('--abbrev-ref').arg('HEAD');
        expect(command.build()).toBe('git rev-parse --abbrev-ref HEAD');
      });
    });
  });
});
