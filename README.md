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

-  Define Services: Create your service classes and use the @Injectable decorator and use `ServiceLifetime` enum to register your services as Singleton or Transient..
- Resolve Services: Use the ServiceProvider to resolve instances of your services.


## Example
Let's walk through a complete example.

1. Define Services
Create some simple services and use the @Injectable decorator.

```typescript
// src/services/logger.ts
import { Injectable } from 'di-injectable'; 

@Injectable(ServiceLifetime.Singleton)
export class Logger {
  log(message: string) {
    console.log(`Logger: ${message}`);
  }
}
``` 
```typescript
// src/services/userService.ts
import { Injectable, Inject } from 'di-injectable';
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




2. Resolve Services
Use the ServiceProvider to resolve instances of your services.

```typescript
// src/app.ts
import { ServiceProvider } from 'di-injectable';
import { UserService } from './services/userService';

const serviceProvider = new ServiceProvider();

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
  - We register the Logger service as a Singleton, meaning only one instance of Logger will be created and shared.
  - We register the UserService as a Transient by default, meaning a new instance of UserService will be created every time it is resolved.
- Resolving Services:
  - We create a ServiceProvider instance and pass the ServiceCollection to it.
  - We resolve an instance of UserService using the serviceProvider.
The UserService will have the Logger instance injected into it due to the @Inject decorator.


## Service Lifetimes
- Singleton: Only one instance of the service is created and shared.
- Transient: A new instance of the service is created every time it is requested.


### API Reference


- ServiceProvider:
  - resolve<T>(token: any): T: Resolves an instance of the service.
  - Injectable: Decorator to mark a class as injectable as register it.
  - Inject: Decorator to inject dependencies into the constructor.


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)


### Steps to Use

1. **Create Your Services**: Define your services using the `@Injectable` decorator and use `ServiceLifetime` enum to register your services as Singleton or Transient.
2. **Resolve Services**: Use `ServiceProvider` to resolve instances of your services.
