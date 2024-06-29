"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = Injectable;
require("reflect-metadata");
var ServiceCollection_1 = __importDefault(require("../ServiceCollection"));
var ServiceLifetime_1 = require("../enums/ServiceLifetime");
function Injectable(lifetime) {
    if (lifetime === void 0) { lifetime = ServiceLifetime_1.ServiceLifetime.Transient; }
    return function (target) {
        // Register the class with Injectable decorator and its lifetime using ServiceCollection class
        var serviceCollection = ServiceCollection_1.default.getInstance();
        switch (lifetime) {
            case ServiceLifetime_1.ServiceLifetime.Singleton:
                serviceCollection.addSingleton(target, target);
                break;
            case ServiceLifetime_1.ServiceLifetime.Transient:
                serviceCollection.addTransient(target, target);
                break;
            default:
                throw new Error("Invalid lifetime type");
        }
    };
}
