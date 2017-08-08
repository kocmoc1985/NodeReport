import {Component, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {DataService} from '../services/data.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-article',
    templateUrl: 'app/components/template/article.html',
    styleUrls: ['app/components/css/article.css'],
    providers: [DataService]
})

export class ArticleComponent implements OnInit {

    private lang: any;
    private article: any;
    private $el: any;

    constructor(
        private dataService: DataService,
        private el: ElementRef,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.definelang();
    }

    set(data: any) {
        this.article = data[0];
    }

    goBack(): void {
        this.location.back();
    }

    definelang() {
        this.dataService.definelang().then(
            (lang) => {
                this.lang = lang;
            }
        );
    }

    ngOnInit(): void {
        //#JQUERY + ANGULAR
        this.$el = $(this.el.nativeElement).parent();
        //#ROUTING_DETAILED
        this.route.params
            .switchMap((params: Params) => this.dataService.getArticleByLink(params['id']))
            .subscribe(data => (this.set(data))); //(console.log("data",data))
    }
    

}