import "reflect-metadata";
import { ServiceLifetime } from "./enums/ServiceLifetime";
export declare function Injectable(lifetime?: ServiceLifetime): ClassDecorator;
export declare function Inject(token: any): ParameterDecorator;
