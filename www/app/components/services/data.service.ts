import {Injectable} from '@angular/core';
import {RestEntity} from '../rest/rest.class';
import {RestService} from '../rest/rest.service';

declare function _find(param: any): any;

@Injectable()
export class DataService {
    public CONTENT_REST: RestEntity;
    public ARTICLE_REST: RestEntity;
    private LOGIN_REST: RestEntity;
    public LINK_REST: RestEntity;
    private LANG_REST: RestEntity;
    private USERINFO_REST: RestEntity;


    constructor(private restService: RestService) {
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
    get(rest: RestEntity, properties: any): Promise<any[]> {
        //#PROMISE
        return new Promise(
            (resolve, reject) => {
                rest.find(this._find(properties)).then((data: any) => {
                    resolve(data);
                });
            }
        );
    }


    getUserLang(session: any) {
        return new Promise(
            (resolve, reject) => {
                //
                let sesId = session.cookieVal;
                //
                this.USERINFO_REST.find(this._find({sessionid: sesId})).then((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        console.log("REJECT NULL");
                        reject(null);
                    }
                });
            }
        );
    }

    /**
     * 
     */
    setUserLang(session: any, lang: String) {
        return new Promise(
            (resolve, reject) => {
                //
                let sesId = session['cookieVal'];
                let iP = session['ip'];
                //
                this.USERINFO_REST.update(this._find({sessionid: sesId, _upsert: true}), {sessionid: sesId, lang: lang, ip: iP, lastmodified: Date.now()}).then((data: any, error: any) => {
                    //
                    if (data) {
                        resolve(data);
                    }

                    if (error) {
                        reject(error);
                    }

                });
            }
        );
    }

    /**
     * Important
     */
    definelang(): Promise<any[]> {
        return new Promise(
            (resolve, reject) => {
                let lang = "";
                this.getSession().then(
                    (session) => {
                        this.getUserLang(session).then(
                            (data) => {
                                if (data[0]) {
                                    lang = data[0].lang;
                                    resolve(lang);
                                } else {
                                    lang = null;
                                }
                                //
                                if (!lang) {
                                    this.getLang().then(
                                        (systemLang) => {
                                            lang = systemLang[0].lang;
                                            //
                                            this.setUserLang(session, lang).then(
                                                (data) => {
                                                    console.log("SET USER LANG",data);
                                                    resolve(lang);
                                                }
                                            );
                                            //
                                        }
                                    );
                                }
                            }
                        );
                    }
                );
            }
        );
    }


    getLang() {
        return new Promise(
            (resolve, reject) => {
                this.LANG_REST.find(this._find('')).then((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        reject(null);
                    }
                });
            }
        );
    }



    getSession(): Promise<any[]> {
        return new Promise(
            (resolve, reject) => {
                $.getJSON('/checksession', function (data, textStatus, jqXHR) {
                    if (data) {
                        resolve(data);
                    } else {
                        reject(null);
                    }

                });
            }
        );
    }

    /**
     * This one is not ready, change to the "rest.class.ts" have to be done!!!
     */
    getAccessLevel(): Promise<any[]> {
        //#PROMISE
        return new Promise(
            (resolve, reject) => {
                $.getJSON('/accesslevel', function (level, textStatus, jqXHR) {
                    if (level) {
                        resolve(level);
                    } else {
                        resolve(0);
                    }
                });
            }
        );
    }


    logIn(properties: any): Promise<any[]> {
        //#PROMISE
        return new Promise(
            (resolve, reject) => {
                this.LOGIN_REST.create(properties).then((data: any) => {
                    resolve(data);
                });
            }
        );
    }


    getArticleByLink(link: String) {
        //#ROUTING_DETAILED
        return new Promise(
            (resolve, reject) => {
                this.ARTICLE_REST.find(this._find({link: link})).then((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        console.log("Data rejected: getArticleByLink(...)");
                        reject("Promise rejected");
                    }
                });
            }
        );
    }

    /**
     * @deprecated Use just as example
     */
    setUserInfo(session: any) {
        return new Promise(
            (resolve, reject) => {
                //
                let sesId = session['cookieVal'];
                let iP = session['ip'];
                //
                this.USERINFO_REST.update(this._find({sessionid: sesId, _upsert: true}), {sessionid: sesId, ip: iP}).then((data: any, error: any) => {
                    //
                    if (data) {
                        resolve(data);
                    }

                    if (error) {
                        reject(error);
                    }

                });
            }
        );
    }


    _find(obj: any) {
        return "find/" + JSON.stringify(obj);
    }

}
