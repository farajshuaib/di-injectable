"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceLifetime = void 0;
var ServiceLifetime;
(function (ServiceLifetime) {
    ServiceLifetime[ServiceLifetime["Transient"] = 0] = "Transient";
    ServiceLifetime[ServiceLifetime["Singleton"] = 1] = "Singleton";
})(ServiceLifetime || (exports.ServiceLifetime = ServiceLifetime = {}));
