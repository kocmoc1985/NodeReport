import {Component, OnInit, ElementRef} from '@angular/core';
import {DataService} from '../services/data.service';

declare var TABLE_STARTPAGE: any;
declare var TABLE_UTBILDNING: any;
declare var TABLE_CONTENT_ALL: any;
declare var TABLE_REMIX: any;
declare var TABLE_LORAWAN: any;
declare var TABLE_ARTICLES: any;
declare var TABLE_LOGIN: any;
declare var TABLE_ACCESS: any;
declare var TABLE_LINKS: any;
declare var TABLE_LANG: any;
declare var TABLE_USERINFO: any;

declare var LOGIN_HANDLER_REST: any;

@Component({
    selector: 'app-admin',
    templateUrl: 'app/components/template/admin.html',
    styleUrls: ['app/components/css/admin.css'],
    providers: [DataService]
})

export class AdminComponent implements OnInit {

    private $el: any;
    private accessLevel: Number;

    constructor(
        private dataService: DataService,
        private el: ElementRef
    ) {}

    logInAsAdmin() {
        LOGIN_HANDLER_REST.create({username: "admin", password: "0000"}, function (data: any, textStatus: any, jqXHR: any) {
            $('#output').text(JSON.stringify(data, null, 1));
        });
    }

    logOut() {
        LOGIN_HANDLER_REST.delete('', function (data: any, textStatus: any, jqXHR: any) {
            $('#output').text(JSON.stringify(data, null, 1));
        });
    }

    showTableStartPage() {
        TABLE_STARTPAGE.show(true);
    }

    showTableUtb() {
        TABLE_UTBILDNING.show(true);
    }

    showTableLoraWan() {
        TABLE_LORAWAN.show(true);
    }

    showTableRemix() {
        TABLE_REMIX.show(true);
    }

    showTableArticles() {
        TABLE_ARTICLES.show(true);
    }

    showTableContentAll() {
        TABLE_CONTENT_ALL.show(true);
    }

    showTableAccounts() {
        TABLE_LOGIN.show(true);
    }

    showTableAccess() {
        TABLE_ACCESS.show(true);
    }

    showTableLinks() {
        TABLE_LINKS.show(true);
    }

    showTableLang() {
        TABLE_LANG.show(true);
    }
    
    showTableUserInfo(){
        TABLE_USERINFO.show(true);
    }

    ngOnInit() {
        this.$el = $(this.el.nativeElement).parent();
        this.checkAccess();
    }

    getSession() {
        this.dataService.getSession().then(
            (data: any) => {
                $('#output').text(JSON.stringify(data, null, 1));
            }
        );
    }

    checkAccess() {
        this.dataService.getAccessLevel().then(
            (data: any) => {
                console.log("Access:", data);
                this.accessLevel = data;
            }
        );
    }


}