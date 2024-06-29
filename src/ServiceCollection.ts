import { ServiceLifetime } from "./enums/ServiceLifetime";
import { ServiceDescriptor } from "./models/ServiceDescriptor";

class ServiceCollection {
  private static instance: ServiceCollection | null = null;
  private readonly services = new Map<any, ServiceDescriptor>();

  private constructor() {}

  public static getInstance(): ServiceCollection {
    if (!this.instance) {
      this.instance = new ServiceCollection();
    }
    return this.instance;
  }

  public addTransient(token: any, implementation: any) {
    this.services.set(
      token,
      new ServiceDescriptor(token, implementation, ServiceLifetime.Transient)
    );
  }

  public addSingleton(token: any, implementation: any) {
    this.services.set(
      token,
      new ServiceDescriptor(token, implementation, ServiceLifetime.Singleton)
    );
  }

  public getServices() {
    return this.services;
  }
}

export default ServiceCollection;
