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
var PriceKr = (function () {
    function PriceKr() {
    }
    PriceKr.prototype.transform = function (value, args) {
        if (!value)
            return value;
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr";
    };
    return PriceKr;
}());
PriceKr = __decorate([
    core_1.Pipe({ name: 'pricekr' })
], PriceKr);
exports.PriceKr = PriceKr;
// Usage example, to make escape chars work
// <p [innerHTML]="(object.area | kvadratM)" ></p> 
//# sourceMappingURL=pricekr.pipe.js.map