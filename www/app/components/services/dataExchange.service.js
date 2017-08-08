"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataExchange = DataExchange_1 = (function () {
    function DataExchange() {
        var _this = this;
        //
        if (DataExchange_1.globalMem == null) {
            DataExchange_1.globalMem = {};
        }
        // Share method through global mem
        //#METHOD SHARING
        DataExchange_1.globalMem.showInfoModal = function (title, infoMsg, customizedObj, size, type) {
            _this.showInfoModal(title, infoMsg, customizedObj, size, type);
        };
    }
    DataExchange.prototype.create = function (that) {
        // call from any component using this service with this as argument
        // to get a components specific memory that survives
        // between route changes
        var className = that.constructor.name;
        DataExchange_1.localMem[className] = DataExchange_1.localMem[className] || {};
        return DataExchange_1.localMem[className];
    };
    DataExchange.prototype.global = function () {
        // call from any component using this service
        // to get a global memory shared between all components
        return DataExchange_1.globalMem;
    };
    //#METHOD SHARING
    DataExchange.prototype.showInfoModal = function (title, infoMsg, customizedObj, size, type) {
        MYMODALS.showInfoModal(title, infoMsg, customizedObj, size, type);
    };
    return DataExchange;
}());
DataExchange.localMem = {}; // local per class/component
DataExchange = DataExchange_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], DataExchange);
exports.DataExchange = DataExchange;
var DataExchange_1;
//# sourceMappingURL=dataExchange.service.js.map