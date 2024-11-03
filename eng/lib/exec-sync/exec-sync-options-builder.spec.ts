import { ExecSyncOptionsBuilder } from './exec-sync-options-builder';

describe('execSyncOptionsBuilder', () => {
  it('should return an execSync options object with a build method that returns a default object', () => {
    const execSyncOptions = new ExecSyncOptionsBuilder();
    expect(execSyncOptions.build()).toEqual({
      stdio: ['inherit', 'inherit', 'inherit'],
    });
  });
  it('should allow providing all stdio values', () => {
    const execSyncOptions = new ExecSyncOptionsBuilder();
    execSyncOptions.input('pipe').output('pipe').error('pipe');
    expect(execSyncOptions.build()).toEqual({
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  });
  it('should allow providing some stdio values', () => {
    const execSyncOptions = new ExecSyncOptionsBuilder();
    execSyncOptions.input('pipe').error('pipe');
    expect(execSyncOptions.build()).toEqual({
      stdio: ['pipe', 'inherit', 'pipe'],
    });
  });
  describe('input()', () => {
    it('should allow providing an input value', () => {
      const execSyncOptions = new ExecSyncOptionsBuilder();
      execSyncOptions.input('pipe');
      expect(execSyncOptions.build()).toEqual({
        stdio: ['pipe', 'inherit', 'inherit'],
      });
    });
  });
  describe('output()', () => {
    it('should allow providing an output value', () => {
      const execSyncOptions = new ExecSyncOptionsBuilder();
      execSyncOptions.output('pipe');
      expect(execSyncOptions.build()).toEqual({
        stdio: ['inherit', 'pipe', 'inherit'],
      });
    });
  });
  describe('error()', () => {
    it('should allow providing an error value', () => {
      const execSyncOptions = new ExecSyncOptionsBuilder();
      execSyncOptions.error('pipe');
      expect(execSyncOptions.build()).toEqual({
        stdio: ['inherit', 'inherit', 'pipe'],
      });
    });
  });
});
