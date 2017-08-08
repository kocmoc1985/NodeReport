"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap"); // #ngbootstrap
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./components/app.component");
var footer_component_1 = require("./components/main/footer.component");
// Pages
var main_component_1 = require("./components/main/main.component");
var standard_component_1 = require("./components/main/standard.component");
var article_component_1 = require("./components/main/article.component");
var login_component_1 = require("./components/main/login.component");
var admin_component_1 = require("./components/main/admin.component");
// Components
var header_component_1 = require("./components/main/header.component");
var modal_component_1 = require("./components/main/modal/modal.component");
// Services
var rest_service_1 = require("./components/rest/rest.service");
// Pipes
var datecut_pipe_1 = require("./components/pipes/datecut.pipe");
var kvadratm_pipe_1 = require("./components/pipes/kvadratm.pipe");
var pricekr_pipe_1 = require("./components/pipes/pricekr.pipe");
var safeHtml_pipe_1 = require("./components/pipes/safeHtml.pipe");
// for separate routing file
var app_routing_module_1 = require("./components/app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule,
            ng_bootstrap_1.NgbModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent,
            header_component_1.HeaderComponent,
            footer_component_1.FooterComponent,
            main_component_1.MainComponent,
            standard_component_1.StandardComponent,
            article_component_1.ArticleComponent,
            login_component_1.LoginComponent,
            admin_component_1.AdminComponent,
            modal_component_1.NgbdModalBasic,
            datecut_pipe_1.DateCutPipe,
            kvadratm_pipe_1.KvadratMeter,
            safeHtml_pipe_1.SafeHtml,
            pricekr_pipe_1.PriceKr
            // for separate routing file
            // AppRoutingModule
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        providers: [
            rest_service_1.RestService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map