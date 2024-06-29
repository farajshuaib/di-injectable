import 'reflect-metadata';

export enum ServiceLifetime {
  Transient,
  Singleton
}

export class ServiceDescriptor {
  constructor(
    public readonly token: any,
    public readonly implementation: any,
    public readonly lifetime: ServiceLifetime
  ) {}
}

export class ServiceCollection {
  private readonly services = new Map<any, ServiceDescriptor>();

  public addTransient(token: any, implementation: any) {
    this.services.set(token, new ServiceDescriptor(token, implementation, ServiceLifetime.Transient));
  }

  public addSingleton(token: any, implementation: any) {
    this.services.set(token, new ServiceDescriptor(token, implementation, ServiceLifetime.Singleton));
  }

  public getServices() {
    return this.services;
  }
}

export class ServiceProvider {
  private readonly services = new Map<any, any>();
  private readonly descriptors: Map<any, ServiceDescriptor>;

  constructor(private readonly serviceCollection: ServiceCollection) {
    this.descriptors = serviceCollection.getServices();
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
    const tokens = Reflect.getMetadata('design:paramtypes', implementation) || [];
    const injections = tokens.map((token: any) => this.resolve(token));
    return new implementation(...injections);
  }
}

export function Injectable(): ClassDecorator {
  return (target: any) => {};
}

export function Inject(token: any): ParameterDecorator {
  return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    const existingInjectedTokens = Reflect.getOwnMetadata('design:paramtypes', target) || [];
    existingInjectedTokens[parameterIndex] = token;
    Reflect.defineMetadata('design:paramtypes', existingInjectedTokens, target);
  };
}