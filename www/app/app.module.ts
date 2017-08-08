import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // #ngbootstrap
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import {AppComponent} from './components/app.component';
import {FooterComponent} from './components/main/footer.component';

// Pages
import {MainComponent} from './components/main/main.component';
import {StandardComponent} from './components/main/standard.component';
import {ArticleComponent} from './components/main/article.component';
import {LoginComponent} from './components/main/login.component';
import {AdminComponent} from './components/main/admin.component';

// Components
import {HeaderComponent} from './components/main/header.component';
import {NgbdModalBasic} from './components/main/modal/modal.component';

// Services
import {RestService} from './components/rest/rest.service';

// Pipes
import {DateCutPipe} from './components/pipes/datecut.pipe';
import {KvadratMeter} from './components/pipes/kvadratm.pipe';
import {PriceKr} from './components/pipes/pricekr.pipe';
import {SafeHtml} from './components/pipes/safeHtml.pipe';

// for separate routing file
import {AppRoutingModule} from './components/app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule, //#ROUTING
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainComponent,
        StandardComponent,
        ArticleComponent,
        LoginComponent,
        AdminComponent,
        NgbdModalBasic,
        DateCutPipe,
        KvadratMeter,
        SafeHtml,
        PriceKr
        // for separate routing file
        // AppRoutingModule
    ],
    bootstrap: [
        AppComponent
    ],

    providers: [
        RestService
    ]
})

export class AppModule {
   
}

