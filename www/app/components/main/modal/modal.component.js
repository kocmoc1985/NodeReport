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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var dataExchange_service_1 = require("../../services/dataExchange.service");
var http_1 = require("@angular/http");
var NgbdModalBasic = (function () {
    function NgbdModalBasic(modalService, memService, http) {
        var _this = this;
        this.modalService = modalService;
        this.memService = memService;
        this.http = http;
        this.disableSubmit = true;
        this.formdata = {
            firstname: '',
            lastname: '',
            phonenumber: '',
            email: '',
            errand: ''
        };
        this.title = 'Kontakta oss';
        this.body = 'Vill du komma i kontakt med någon av våra mäklare, eller har du en annan fråga? Fyll i ditt ärende i kontaktformuläret så hör vi av oss till dig. Du kan även ringa oss på 08-55551300 mellan kl 8-20 alla dagar i veckan.';
        this.send = 'Skicka';
        this.cancel = 'Avbryt';
        this.globalMem = this.memService.global();
        this.globalMem.openModal = function () {
            _this.open();
        };
    }
    NgbdModalBasic.prototype.open = function () {
        var _this = this;
        console.log("clicked");
        this.resetFormData();
        this.modalService.open(this.content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function () { });
    };
    NgbdModalBasic.prototype.registerContent = function (content) {
        this.content = content;
    };
    NgbdModalBasic.prototype.sendContactInfo = function () {
        // Send
        var _observable = this.http.post("/register-contact-info", this.formdata);
        _observable.subscribe();
    };
    NgbdModalBasic.prototype.resetFormData = function () {
        for (var key in this.formdata) {
            this.formdata[key] = '';
        }
    };
    NgbdModalBasic.prototype.checkFields = function () {
        var everyThingFilledIn = true;
        for (var key in this.formdata) {
            if (key == "phonenumber") {
                continue;
            }
            everyThingFilledIn = everyThingFilledIn && this.formdata[key] !== '';
        }
        this.disableSubmit = !everyThingFilledIn;
    };
    return NgbdModalBasic;
}());
NgbdModalBasic = __decorate([
    core_1.Component({
        selector: 'app-modal',
        templateUrl: 'app/components/main/modal/modal.html',
        styleUrls: ['./modal.css'],
        providers: [dataExchange_service_1.DataExchange]
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
        dataExchange_service_1.DataExchange,
        http_1.Http])
], NgbdModalBasic);
exports.NgbdModalBasic = NgbdModalBasic;
//# sourceMappingURL=modal.component.js.map