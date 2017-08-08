import {Component, OnInit, ElementRef} from '@angular/core';
import {Router} from '@angular/router';

import {DataService} from '../services/data.service';

@Component({
    selector: 'app-login',
    templateUrl: 'app/components/template/login.html',
    styleUrls: ['app/components/css/login.css'],
    providers: [DataService]
})

export class LoginComponent implements OnInit {

    private login: any;
    private $el: any;
    private pass: String;
    private loginName: String;
    private accessLevel: Number;

    constructor(
        private dataService: DataService,
        private el: ElementRef,
        private router: Router
    ) {}

    ngOnInit() {
        //#JQUERY + ANGULAR
        this.$el = $(this.el.nativeElement).parent();
        this.checkAccess();
    }

    logIn() {
        //#DATA-BINDING ngModel
        let properties = {username: this.loginName, password: this.pass};

        //#PROMISE
        this.dataService.logIn(properties).then(
            (data: any) => {
                this.login = data;
                console.log("login", data);
                this.router.navigate(['/admin']);
            }
        );
    }

    checkAccess() {
        this.dataService.getAccessLevel().then(
            (data: any) => {
                //
                this.accessLevel = data;
                //
                if (this.accessLevel > 0) {
                    this.router.navigate(['/admin']);
                }
            }
        );
    }


}