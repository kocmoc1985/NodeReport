import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RestEntity} from "./rest.class";

@Injectable()
export class RestService {

    constructor(private http: Http) {}

    newRestEntity(entityName: string) {
        let restEntity = new RestEntity(entityName);
        restEntity.http = this.http;
        return restEntity;
    }

}


