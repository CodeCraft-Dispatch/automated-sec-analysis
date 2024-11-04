
export class FtaEmptyConfigValidator {
    public static isEmpty(config) {
        const emptyConfig = !config || typeof config !== 'object' || !(Object.keys(config).length);
        return emptyConfig ? { emptyConfig: true } : false;
    }
}