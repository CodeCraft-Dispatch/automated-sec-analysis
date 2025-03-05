
/**
 * Domain Specific Language (DSL) context interface
 * @internal
 */
export interface IDslContext {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

/**
 * Domain Specific Language (DSL) context
 * @internal
 * 
 * @example
 * ```typescript
 * const dslContext = DslContext.create();
 * dslContext['greeting'] = 'Hello, World!';
 * console.log(dslContext.greeting); // Hello, World!
 * ```
 */
export class DslContext implements IDslContext {
    private context: { [key: string]: never } = {};

    /**
     * Create a new DSL context
     * @returns DSL context
     */
    public static create(): DslContext {
        return (new DslContext()).createProxy();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;

    private createProxy(): this {
        return new Proxy(this, {
            get: (target, prop: string | symbol) => {
                if (prop in target) {
                    return (target as never)[prop];
                }
                return target.context[prop as string];
            },
            set: (target, prop: string | symbol, value: never) => {
                target.context[prop as string] = value;
                return true;
            }
        });
    }
}