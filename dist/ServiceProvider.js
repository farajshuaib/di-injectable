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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
var ServiceCollection_1 = __importDefault(require("./ServiceCollection"));
var ServiceLifetime_1 = require("./enums/ServiceLifetime");
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider() {
        this.services = new Map();
        this.serviceCollection = ServiceCollection_1.default.getInstance();
        this.descriptors = this.serviceCollection.getServices();
    }
    ServiceProvider.prototype.resolve = function (token) {
        var descriptor = this.descriptors.get(token);
        if (!descriptor) {
            throw new Error("Service not found for token: ".concat(token.toString()));
        }
        if (descriptor.lifetime === ServiceLifetime_1.ServiceLifetime.Singleton) {
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
        var tokens = Reflect.getMetadata("design:paramtypes", implementation) || [];
        var injections = tokens.map(function (token) { return _this.resolve(token); });
        return new (implementation.bind.apply(implementation, __spreadArray([void 0], injections, false)))();
    };
    return ServiceProvider;
}());
exports.ServiceProvider = ServiceProvider;
