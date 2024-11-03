import { ExecSyncBuilderSpecApi } from "./exec-sync-builder.spec.api";

describe("execSyncBuilder", () => {
  let api = new ExecSyncBuilderSpecApi();
  beforeEach(() => {
    api = new ExecSyncBuilderSpecApi();
  });

  api.getMethodNameArray().forEach((method) => {
    it(`should return an execSync object with a ${method} method`, () => {
      expect(api.getMethod(method)).toBeDefined();
    });
  });

  api.getMethodCallMapping().forEach((methodCall) => {
    it(`should return the same execSync builder instance for ${methodCall.name}`, () => {
      expect(api.getMethodCall(methodCall)).toBe(api.instance);
    });
  });

  it("should execute the command", () => {
    const output = api.getFullTestOutput();

    expect(output.command).toBe("git rev-parse --abbrev-ref HEAD");
    expect(output.options.stdio[0]).toBe("inherit");
    expect(output.options.stdio[1]).toBe("inherit");
    expect(output.options.stdio[2]).toBe("inherit");
  });
  it("should return an empty object if the command is empty", () => {
    const output = api.getEmptyOutput();
    expect(output).toStrictEqual({ command: "", options: { stdio: ["inherit", "inherit", "inherit"] } });
  });
});
