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
var rest_service_1 = require("../rest/rest.service");
var DataService = (function () {
    function DataService(restService) {
        this.restService = restService;
        this.CONTENT_REST = this.restService.newRestEntity("content");
        this.ARTICLE_REST = this.restService.newRestEntity("article");
        this.LOGIN_REST = this.restService.newRestEntity("login");
        this.LINK_REST = this.restService.newRestEntity("links");
        this.LANG_REST = this.restService.newRestEntity("lang");
        this.USERINFO_REST = this.restService.newRestEntity("userinfo");
    }
    /**
     * USE THIS!
     * Find usage example in "list-app.components" -> getFastigheter(...) && getBrokers(...)
     */
    DataService.prototype.get = function (rest, properties) {
        var _this = this;
        //#PROMISE
        return new Promise(function (resolve, reject) {
            rest.find(_this._find(properties)).then(function (data) {
                resolve(data);
            });
        });
    };
    DataService.prototype.getUserLang = function (session) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //
            var sesId = session.cookieVal;
            //
            _this.USERINFO_REST.find(_this._find({ sessionid: sesId })).then(function (data) {
                if (data) {
                    resolve(data);
                }
                else {
                    console.log("REJECT NULL");
                    reject(null);
                }
            });
        });
    };
    /**
     *
     */
    DataService.prototype.setUserLang = function (session, lang) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //
            var sesId = session['cookieVal'];
            var iP = session['ip'];
            //
            _this.USERINFO_REST.update(_this._find({ sessionid: sesId, _upsert: true }), { sessionid: sesId, lang: lang, ip: iP, lastmodified: Date.now() }).then(function (data, error) {
                //
                if (data) {
                    resolve(data);
                }
                if (error) {
                    reject(error);
                }
            });
        });
    };
    /**
     * Important
     */
    DataService.prototype.definelang = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var lang = "";
            _this.getSession().then(function (session) {
                _this.getUserLang(session).then(function (data) {
                    if (data[0]) {
                        lang = data[0].lang;
                        resolve(lang);
                    }
                    else {
                        lang = null;
                    }
                    //
                    if (!lang) {
                        _this.getLang().then(function (systemLang) {
                            lang = systemLang[0].lang;
                            //
                            _this.setUserLang(session, lang).then(function (data) {
                                console.log("SET USER LANG", data);
                                resolve(lang);
                            });
                            //
                        });
                    }
                });
            });
        });
    };
    DataService.prototype.getLang = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.LANG_REST.find(_this._find('')).then(function (data) {
                if (data) {
                    resolve(data);
                }
                else {
                    reject(null);
                }
            });
        });
    };
    DataService.prototype.getSession = function () {
        return new Promise(function (resolve, reject) {
            $.getJSON('/checksession', function (data, textStatus, jqXHR) {
                if (data) {
                    resolve(data);
                }
                else {
                    reject(null);
                }
            });
        });
    };
    /**
     * This one is not ready, change to the "rest.class.ts" have to be done!!!
     */
    DataService.prototype.getAccessLevel = function () {
        //#PROMISE
        return new Promise(function (resolve, reject) {
            $.getJSON('/accesslevel', function (level, textStatus, jqXHR) {
                if (level) {
                    resolve(level);
                }
                else {
                    resolve(0);
                }
            });
        });
    };
    DataService.prototype.logIn = function (properties) {
        var _this = this;
        //#PROMISE
        return new Promise(function (resolve, reject) {
            _this.LOGIN_REST.create(properties).then(function (data) {
                resolve(data);
            });
        });
    };
    DataService.prototype.getArticleByLink = function (link) {
        var _this = this;
        //#ROUTING_DETAILED
        return new Promise(function (resolve, reject) {
            _this.ARTICLE_REST.find(_this._find({ link: link })).then(function (data) {
                if (data) {
                    resolve(data);
                }
                else {
                    console.log("Data rejected: getArticleByLink(...)");
                    reject("Promise rejected");
                }
            });
        });
    };
    /**
     * @deprecated Use just as example
     */
    DataService.prototype.setUserInfo = function (session) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //
            var sesId = session['cookieVal'];
            var iP = session['ip'];
            //
            _this.USERINFO_REST.update(_this._find({ sessionid: sesId, _upsert: true }), { sessionid: sesId, ip: iP }).then(function (data, error) {
                //
                if (data) {
                    resolve(data);
                }
                if (error) {
                    reject(error);
                }
            });
        });
    };
    DataService.prototype._find = function (obj) {
        return "find/" + JSON.stringify(obj);
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map