import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

export class RestEntity {

    baseUrl: string;
    http: any; // injected by the service

    constructor(entityName: string) {
        // Mocking with json
        //    this.baseUrl = './json/' + entityName + '.json';

        // Real backend/REST api
        this.baseUrl = '/rest/' + entityName;
    }

    httpRequest(type: string, idOrQuery: string, requestBody: any) {
        let url: string = this.baseUrl + '/' + idOrQuery;
        // console.log("REST_URL:", url);
        // remove trailing slahses
        while (url.substr(-1) == '/') {url = url.substring(0, url.length - 1);}
        // make request
        return this.http[type](url, requestBody)
            // ...and calling .json() on the response to return data
            .map((res: any) => {
                return res.json();
            })
            //...er            rors if any
//            .catch((error            : any) => {
//               Observable.throw('Server error$:             ' + error);
////                return Obser            vable.name;
//            });

            .catch((error: any) => Observable.throw('Server error$$$:' + error));
    }

    promiseMaker(type: string, idOrQuery: string = '', requestBody: any = undefined) {

//        console.log("TYPE " + type + " |  QUERY " + idOrQuery + "  |  REQBODY ", requestBody);

        return new Promise((resolve, reject): void => {
            this.httpRequest(type, idOrQuery, requestBody).subscribe(
                (data: any) => {resolve(data);},
                (error: any) => {reject(error);}
            );
        });

    }


    create(requestBody: Object): any {
        return this.promiseMaker('post', '', requestBody);
    }

    find(idOrQuery: string): any {
        return this.promiseMaker('get', idOrQuery);
    }

    update(idOrQuery: string, requestBody: Object): any {
        return this.promiseMaker('put', idOrQuery, requestBody);
    }

    delete(idOrQuery: string): any {
        return this.promiseMaker('delete', idOrQuery);
    }

    //=========================================================================

}