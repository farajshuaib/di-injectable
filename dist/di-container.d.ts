import 'reflect-metadata';
export declare enum ServiceLifetime {
    Transient = 0,
    Singleton = 1
}
export declare class ServiceDescriptor {
    readonly token: any;
    readonly implementation: any;
    readonly lifetime: ServiceLifetime;
    constructor(token: any, implementation: any, lifetime: ServiceLifetime);
}
export declare class ServiceCollection {
    private readonly services;
    addTransient(token: any, implementation: any): void;
    addSingleton(token: any, implementation: any): void;
    getServices(): Map<any, ServiceDescriptor>;
}
export declare class ServiceProvider {
    private readonly serviceCollection;
    private readonly services;
    private readonly descriptors;
    constructor(serviceCollection: ServiceCollection);
    resolve<T>(token: any): T;
    private createInstance;
}
export declare function Injectable(): ClassDecorator;
export declare function Inject(token: any): ParameterDecorator;
