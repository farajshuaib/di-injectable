import "reflect-metadata";

export function Inject(token: any): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => {
    const existingInjectedTokens =
      Reflect.getOwnMetadata("design:paramtypes", target) || [];
    existingInjectedTokens[parameterIndex] = token;
    Reflect.defineMetadata("design:paramtypes", existingInjectedTokens, target);
  };
}
