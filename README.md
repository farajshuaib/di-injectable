# Injectable

A simple Dependency Injection (DI) library for TypeScript supporting Singleton and Transient service lifetimes.

## Installation

First, install the package via npm or yarn:

```sh
npm install injectable
yarn add injectable
```

## Usage

# Setting Up Services

-  Define Services: Create your service classes and use the @Injectable decorator.
- Register Services: Use the ServiceCollection to register your services as either Singleton or Transient.
- Resolve Services: Use the ServiceProvider to resolve instances of your services.


## Example
Let's walk through a complete example.

1. Define Services
Create some simple services and use the @Injectable decorator.

```typescript
// src/services/logger.ts
import { Injectable } from 'your-di-library';

@Injectable()
export class Logger {
  log(message: string) {
    console.log(`Logger: ${message}`);
  }
}

// src/services/userService.ts
import { Injectable, Inject } from 'your-di-library';
import { Logger } from './logger';

@Injectable()
export class UserService {
  constructor(@Inject(Logger) private logger: Logger) {}

  getUser() {
    this.logger.log('Getting user...');
    return { id: 1, name: 'John Doe' };
  }
}
```


2. Register Services
Register your services with the ServiceCollection.

```typescript
// src/container.ts
import { ServiceCollection, ServiceLifetime } from 'your-di-library';
import { Logger } from './services/logger';
import { UserService } from './services/userService';

const services = new ServiceCollection();
services.addSingleton(Logger, Logger);
services.addTransient(UserService, UserService);

export { services };
```


3. Resolve Services
Use the ServiceProvider to resolve instances of your services.

```typescript
// src/app.ts
import { ServiceProvider } from 'your-di-library';
import { services } from './container';
import { UserService } from './services/userService';

const serviceProvider = new ServiceProvider(services);

const userService = serviceProvider.resolve<UserService>(UserService);
const user = userService.getUser();
console.log(user);
```

## Explanation

- Defining Services:
  - The Logger service is a simple logger class.
  - The UserService class depends on the Logger service. The @Inject decorator is used to inject the Logger service 
  - into the UserService constructor.
- Registering Services:
  - We create a ServiceCollection instance.
  - We register the Logger service as a Singleton, meaning only one instance of Logger will be created and shared.
  - We register the UserService as a Transient, meaning a new instance of UserService will be created every time it is resolved.
- Resolving Services:
  - We create a ServiceProvider instance and pass the ServiceCollection to it.
  - We resolve an instance of UserService using the serviceProvider.
The UserService will have the Logger instance injected into it due to the @Inject decorator.


## Service Lifetimes
- Singleton: Only one instance of the service is created and shared.
- Transient: A new instance of the service is created every time it is requested.


### API Reference

-  ServiceCollection:
    - addSingleton(token: any, implementation: any): Registers a service as Singleton.
    - addTransient(token: any, implementation: any): Registers a service as Transient.
- ServiceProvider:
  - resolve<T>(token: any): T: Resolves an instance of the service.
  - Injectable: Decorator to mark a class as injectable.
  - Inject: Decorator to inject dependencies into the constructor.


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)


### Steps to Use

1. **Create Your Services**: Define your services using the `@Injectable` decorator.
2. **Register Your Services**: Use `ServiceCollection` to register your services as Singleton or Transient.
3. **Resolve Services**: Use `ServiceProvider` to resolve instances of your services.
