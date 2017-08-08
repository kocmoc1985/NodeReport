import {Component, OnInit, AfterViewInit} from '@angular/core';

import {Router, NavigationStart} from '@angular/router'

import {DataService} from '../services/data.service';
import {DataExchange} from '../services/dataExchange.service';

@Component({
    selector: 'app-header',
    templateUrl: 'app/components/template/header.html',
    styleUrls: ['app/components/css/header.css'],
    providers: [DataExchange, DataService]
})


export class HeaderComponent implements OnInit, AfterViewInit {

    private switchLangBtn: Boolean;
    private lang: any;
    private globalMem: any;
    private links: any[];
    private URL: String;
    private static TEMP: String;

    constructor
        (
        private memService: DataExchange,
        private dataService: DataService,
        private router: Router
        ) {
        //
        this.globalMem = this.memService.global();
        //
        this.defineSwitchLangBtn();
        this.definelang();
    }

    ngOnInit() {
        //
        this.router.events.subscribe(
            (url: any) => this.go(url)
        );
        //
        this.getComponents();
    }

    go(url: any) {
        if (url instanceof NavigationStart) {
            this.URL = url.url;
            //
//            console.log("URL:", this.URL);
            //
            if (this.URL.trim().indexOf("#") !== -1) {
                HeaderComponent.TEMP = this.URL.trim().slice(2) + "-lnk";
                setTimeout(this.autoClick, 500);
                return true;
            }
        }
    }

    autoClick() {
        $('#' + HeaderComponent.TEMP).trigger('click');
    }

    ngAfterViewInit() {
        
    }

    definelang() {
        this.dataService.definelang().then(
            (lang) => {
                this.lang = lang;
            }
        );
    }

    defineSwitchLangBtn() {
        this.dataService.getLang().then(
            (data) => {
                this.switchLangBtn = data[0].switchlang;
            }
        );
    }

    /**
     * Called from template
     */
    setUserLang(lang: String) {
        this.lang = lang;
        this.dataService.getSession().then(
            (session) => {
                //
                this.dataService.setUserLang(session, lang).then(
                    (data) => {
                        location.reload();
                    }
                );
            }
        );
    }

    getComponents() {
        let properties = {_fields: "", _sort: "serial"}; //_distinct: "link"
        let rest = this.dataService.LINK_REST;
        //
        this.dataService.get(rest, properties).then(
            (data) => {
                this.links = data;
            }
        );
    }

    /**
     * @deprecated
     */
    updateUserInfo() {
        this.dataService.getSession().then(
            (session) => {
                //
                this.dataService.setUserInfo(session).then(
                    (data) => {
                        console.log("SAVED USER INFO, FROM header.cmp:", data);
                    }
                );
            }
        );
    }


}
