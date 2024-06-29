import "reflect-metadata";
import ServiceCollection from "../ServiceCollection";
import { ServiceLifetime } from "../enums/ServiceLifetime";

export function Injectable(
  lifetime: ServiceLifetime = ServiceLifetime.Transient
): ClassDecorator {
  return (target: any) => {
    // Register the class with Injectable decorator and its lifetime using ServiceCollection class
    const serviceCollection = ServiceCollection.getInstance();

    switch (lifetime) {
      case ServiceLifetime.Singleton:
        serviceCollection.addSingleton(target, target);
        break;
      case ServiceLifetime.Transient:
        serviceCollection.addTransient(target, target);
        break;
      default:
        throw new Error("Invalid lifetime type");
    }
  };
}
