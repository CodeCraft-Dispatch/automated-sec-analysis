import { DslContext, IDslContext } from "./dsl-context";

/**
 * Domain Specific Language (DSL) interface
 * @internal
 */
export interface IDsl<TGivenDomain, TWhenDomain, TThenDomain> {
    given(): TGivenDomain;
    when(): TWhenDomain;
    then(): TThenDomain;
}

/**
 * Factory for creating DSL Domain instances
 * @param context DSL context
 * @returns DSL Domain instance
 */
export type DslDomainFactory<TDomain> = new (context: IDslContext) => TDomain;

/**
 * Domain Specific Language (DSL) for organizing test steps
 * @param TGivenDomain Given domain
 * @param TWhenDomain When domain
 * @param TThenDomain Then domain
 * @returns DSL instance
 * @example
 * ```typescript
 * const fileCaptureDsl = new Dsl(FileCaptureGivenDomainFactory, FileCaptureWhenDomainFactory, FileCaptureThenDomainFactory);
 * fileCaptureDsl.given().targetFileCaptureTimingIsDefined();
 * fileCaptureDsl.when().accessesFileCapture();
 * fileCaptureDsl.then().targetFileCaptureTimingIsProvided();
 * ```
 * @see DslDomainFactory
 */
export class Dsl<TGivenDomain, TWhenDomain, TThenDomain> implements IDsl<TGivenDomain, TWhenDomain, TThenDomain> {
    private readonly context: IDslContext;

    constructor(
        private readonly givenFactory: DslDomainFactory<TGivenDomain>,
        private readonly whenFactory: DslDomainFactory<TWhenDomain>,
        private readonly thenFactory: DslDomainFactory<TThenDomain>
    ) {
        this.context = DslContext.create();
    }

    public given(): TGivenDomain {
        return new this.givenFactory(this.context);
    }

    public when(): TWhenDomain {
        return new this.whenFactory(this.context);
    }

    public then(): TThenDomain {
        return new this.thenFactory(this.context);
    }
}