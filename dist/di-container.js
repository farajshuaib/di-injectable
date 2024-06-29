"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = exports.ServiceCollection = exports.ServiceDescriptor = exports.ServiceLifetime = void 0;
exports.Injectable = Injectable;
exports.Inject = Inject;
require("reflect-metadata");
var ServiceLifetime;
(function (ServiceLifetime) {
    ServiceLifetime[ServiceLifetime["Transient"] = 0] = "Transient";
    ServiceLifetime[ServiceLifetime["Singleton"] = 1] = "Singleton";
})(ServiceLifetime || (exports.ServiceLifetime = ServiceLifetime = {}));
var ServiceDescriptor = /** @class */ (function () {
    function ServiceDescriptor(token, implementation, lifetime) {
        this.token = token;
        this.implementation = implementation;
        this.lifetime = lifetime;
    }
    return ServiceDescriptor;
}());
exports.ServiceDescriptor = ServiceDescriptor;
var ServiceCollection = /** @class */ (function () {
    function ServiceCollection() {
        this.services = new Map();
    }
    ServiceCollection.prototype.addTransient = function (token, implementation) {
        this.services.set(token, new ServiceDescriptor(token, implementation, ServiceLifetime.Transient));
    };
    ServiceCollection.prototype.addSingleton = function (token, implementation) {
        this.services.set(token, new ServiceDescriptor(token, implementation, ServiceLifetime.Singleton));
    };
    ServiceCollection.prototype.getServices = function () {
        return this.services;
    };
    return ServiceCollection;
}());
exports.ServiceCollection = ServiceCollection;
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider(serviceCollection) {
        this.serviceCollection = serviceCollection;
        this.services = new Map();
        this.descriptors = serviceCollection.getServices();
    }
    ServiceProvider.prototype.resolve = function (token) {
        var descriptor = this.descriptors.get(token);
        if (!descriptor) {
            throw new Error("Service not found for token: ".concat(token.toString()));
        }
        if (descriptor.lifetime === ServiceLifetime.Singleton) {
            if (!this.services.has(token)) {
                this.services.set(token, this.createInstance(descriptor));
            }
            return this.services.get(token);
        }
        return this.createInstance(descriptor);
    };
    ServiceProvider.prototype.createInstance = function (descriptor) {
        var _this = this;
        var implementation = descriptor.implementation;
        var tokens = Reflect.getMetadata('design:paramtypes', implementation) || [];
        var injections = tokens.map(function (token) { return _this.resolve(token); });
        return new (implementation.bind.apply(implementation, __spreadArray([void 0], injections, false)))();
    };
    return ServiceProvider;
}());
exports.ServiceProvider = ServiceProvider;
function Injectable() {
    return function (target) { };
}
function Inject(token) {
    return function (target, propertyKey, parameterIndex) {
        var existingInjectedTokens = Reflect.getOwnMetadata('design:paramtypes', target) || [];
        existingInjectedTokens[parameterIndex] = token;
        Reflect.defineMetadata('design:paramtypes', existingInjectedTokens, target);
    };
}
