import {Pipe} from '@angular/core';

import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

@Pipe({name: 'safeHtml'})
export class SafeHtml {
    constructor(private sanitizer: DomSanitizer) {}

    transform(style: any) {
        return this.sanitizer.bypassSecurityTrustHtml(style);
        //return this.sanitizer.bypassSecurityTrustStyle(style);
        // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    }
}

//USAGE: <h3 id="content-a_2" *ngIf="content" [innerHTML]="content[2].content | safeHtml"></h3>