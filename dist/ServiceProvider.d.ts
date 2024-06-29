export declare class ServiceProvider {
    private readonly services;
    private readonly descriptors;
    private readonly serviceCollection;
    constructor();
    resolve<T>(token: any): T;
    private createInstance;
}
