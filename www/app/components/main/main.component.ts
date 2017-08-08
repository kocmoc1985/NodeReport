import {Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';

import {DataService} from '../services/data.service';

@Component({
    selector: 'app-main',
    templateUrl: 'app/components/template/main.html',
    //    template: `
    //    <app-standard [LINK]="'startpage'"></app-standard>
    //    <app-standard [LINK]="'utbildning'"></app-standard>
    //    <app-standard [LINK]="'remix'"></app-standard>
    //    <app-standard [LINK]="'lorawan'"></app-standard>
    //    `,
    styleUrls: ['app/components/css/start-page.css', 'app/components/css/education.css', 'app/components/css/remix.css', 'app/components/css/lorawan.css'],
    providers: [DataService]
})

export class MainComponent implements OnInit, AfterViewInit {

    private $el: any;
    private links: any[];

    constructor(
        private el: ElementRef,
        private dataService: DataService
    ) {
        this.slideDownFunc();
    }

    ngAfterViewInit() {

    }

    ngOnInit() {
        this.$el = $(this.el.nativeElement).parent();
        //
        this.getComponents();
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

    slideDownFunc() {
        //#SlideDown #Anchor
        $(function () {
            $('body').on('click', 'a[href*="#"]:not([href="#"])', function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 600,function(){
                            location.hash = "/";
                        });
                        return false;
                    }
                }
            });
        });
    }

}