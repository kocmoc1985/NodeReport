import {Component, OnInit, Input, ElementRef} from '@angular/core';

import {DataService} from '../services/data.service';

@Component({
    selector: 'app-standard',
    templateUrl: 'app/components/template/standard.html',
    providers: [DataService]
})

export class StandardComponent implements OnInit {

    @Input('LINK') LINK: String;

    private lang: any;
    private content: any;
    private $el: any;

    constructor(
        private dataService: DataService,
        private el: ElementRef
    ) {

    }

    ngOnInit() {
        //#JQUERY + ANGULAR
        this.$el = $(this.el.nativeElement).parent();
        this.getContent();
        this.definelang();
    }

    getContent() {
        let properties = {link: this.LINK, _fields: '', _sort: 'serial', _skip: 0, _limit: 0};
        let rest = this.dataService.CONTENT_REST;

        this.dataService.get(rest, properties).then(
            (data) => {
                this.content = data;
            }
        );
    }

    definelang() {
        this.dataService.definelang().then(
            (lang) => {
                this.lang = lang;
            }
        );
    }


}