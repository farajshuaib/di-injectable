"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceLifetime_1 = require("./enums/ServiceLifetime");
var ServiceDescriptor_1 = require("./models/ServiceDescriptor");
var ServiceCollection = /** @class */ (function () {
    function ServiceCollection() {
        this.services = new Map();
    }
    ServiceCollection.getInstance = function () {
        if (!this.instance) {
            this.instance = new ServiceCollection();
        }
        return this.instance;
    };
    ServiceCollection.prototype.addTransient = function (token, implementation) {
        this.services.set(token, new ServiceDescriptor_1.ServiceDescriptor(token, implementation, ServiceLifetime_1.ServiceLifetime.Transient));
    };
    ServiceCollection.prototype.addSingleton = function (token, implementation) {
        this.services.set(token, new ServiceDescriptor_1.ServiceDescriptor(token, implementation, ServiceLifetime_1.ServiceLifetime.Singleton));
    };
    ServiceCollection.prototype.getServices = function () {
        return this.services;
    };
    ServiceCollection.instance = null;
    return ServiceCollection;
}());
exports.default = ServiceCollection;
