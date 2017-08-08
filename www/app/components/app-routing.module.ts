import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';

import {MainComponent} from './main/main.component';
import {ArticleComponent} from './main/article.component';
import {LoginComponent} from './main/login.component';
import {AdminComponent} from './main/admin.component';


//#ROUTING
const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminComponent},// For testing only
    {path: 'article/:id', component: ArticleComponent} //#ROUTING_DETAILED
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule implements OnInit {

    constructor
        (
        private router: Router,
    ) {
        //IMPORTANT
        //        this.router.events.subscribe((url: any) => console.log(url));
    }

    ngOnInit() {

    }

}