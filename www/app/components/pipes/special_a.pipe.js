"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//#PIPE ANGULAR
var SpecialA = (function () {
    function SpecialA() {
    }
    SpecialA.prototype.transform = function (value, arg1) {
        if (!value)
            return value;
        var rooms = arg1;
        return value + " m&#178; / " + rooms + " rum";
    };
    return SpecialA;
}());
SpecialA = __decorate([
    core_1.Pipe({ name: 'special_a' })
], SpecialA);
exports.SpecialA = SpecialA;
// Usage example
// <p [innerHTML]="object.area | special_a:object.rooms"></p>
//PIPE RESULT: 74 m² / 3 rum 
//# sourceMappingURL=special_a.pipe.js.map