import ServiceCollection from "./ServiceCollection";
import { ServiceLifetime } from "./enums/ServiceLifetime";
import { ServiceDescriptor } from "./models/ServiceDescriptor";

export class ServiceProvider {
  private readonly services = new Map<any, any>();
  private readonly descriptors: Map<any, ServiceDescriptor>;
  private readonly serviceCollection: ServiceCollection =
    ServiceCollection.getInstance();

  constructor() {
    this.descriptors = this.serviceCollection.getServices();
  }

  public resolve<T>(token: any): T {
    const descriptor = this.descriptors.get(token);
    if (!descriptor) {
      throw new Error(`Service not found for token: ${token.toString()}`);
    }

    if (descriptor.lifetime === ServiceLifetime.Singleton) {
      if (!this.services.has(token)) {
        this.services.set(token, this.createInstance(descriptor));
      }
      return this.services.get(token);
    }

    return this.createInstance(descriptor);
  }

  private createInstance(descriptor: ServiceDescriptor) {
    const { implementation } = descriptor;
    const tokens =
      Reflect.getMetadata("design:paramtypes", implementation) || [];
    const injections = tokens.map((token: any) => this.resolve(token));
    return new implementation(...injections);
  }
}
