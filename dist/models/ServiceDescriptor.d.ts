import { ServiceLifetime } from "../enums/ServiceLifetime";
export declare class ServiceDescriptor {
    readonly token: any;
    readonly implementation: any;
    readonly lifetime: ServiceLifetime;
    constructor(token: any, implementation: any, lifetime: ServiceLifetime);
}
