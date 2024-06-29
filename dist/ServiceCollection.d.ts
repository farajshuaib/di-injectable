import { ServiceDescriptor } from "./models/ServiceDescriptor";
declare class ServiceCollection {
    private static instance;
    private readonly services;
    private constructor();
    static getInstance(): ServiceCollection;
    addTransient(token: any, implementation: any): void;
    addSingleton(token: any, implementation: any): void;
    getServices(): Map<any, ServiceDescriptor>;
}
export default ServiceCollection;
