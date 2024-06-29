"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = Inject;
require("reflect-metadata");
function Inject(token) {
    return function (target, propertyKey, parameterIndex) {
        var existingInjectedTokens = Reflect.getOwnMetadata("design:paramtypes", target) || [];
        existingInjectedTokens[parameterIndex] = token;
        Reflect.defineMetadata("design:paramtypes", existingInjectedTokens, target);
    };
}
