import { ServiceLifetime } from "../enums/ServiceLifetime";

export class ServiceDescriptor {
  constructor(
    public readonly token: any,
    public readonly implementation: any,
    public readonly lifetime: ServiceLifetime
  ) {}
}
