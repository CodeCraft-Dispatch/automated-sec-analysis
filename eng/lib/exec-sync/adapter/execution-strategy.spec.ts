import { ExecSyncAdapter, IExecSyncAdapter } from './exec-sync-adapter';
import { ExecutionStrategy } from './execution-strategy';

describe('Execution Strategy', () => {
  let strategy: ExecutionStrategy;

  const setStrategy = (adapter: IExecSyncAdapter, isTest: boolean) => {
    strategy = new ExecutionStrategy(adapter, isTest);
    strategy.setExecSyncAdapter(adapter);
  }

  it('should create an instance', () => {
    const adapter = new ExecSyncAdapter();
    setStrategy(adapter, false);
    expect(strategy).toBeTruthy();
  });

  it('should mark as test', () => {
    const adapter = new ExecSyncAdapter();
    setStrategy(adapter, false);
    strategy.markAsTest();
    const selected = strategy.selectExecutionStrategy('test', {});
    expect(selected()).toStrictEqual({ command: 'test', options: {} });
  });

  it('should return no command', () => {
    const adapter = new ExecSyncAdapter();
    setStrategy(adapter, false);
    const selected = strategy.selectExecutionStrategy('', {});
    expect(selected()).toStrictEqual('');
  });

  it('should return exec', () => {
    const adapter: IExecSyncAdapter = {
      getDefaultExecSync: () => () => "exec",
      exec: (exec, command, options) => exec(command, options)
    };
    setStrategy(adapter, false);
    const selected = strategy.selectExecutionStrategy('ls', {});
    expect(selected()).toBe('exec');
  })
});
