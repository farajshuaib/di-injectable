"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDescriptor = void 0;
var ServiceDescriptor = /** @class */ (function () {
    function ServiceDescriptor(token, implementation, lifetime) {
        this.token = token;
        this.implementation = implementation;
        this.lifetime = lifetime;
    }
    return ServiceDescriptor;
}());
exports.ServiceDescriptor = ServiceDescriptor;
