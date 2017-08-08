import {Pipe, PipeTransform} from '@angular/core';

//#PIPE ANGULAR
@Pipe({name: 'kvadratM'})
export class KvadratMeter implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) return value;
        return `${value} m&#178;`;
    }
}

// Usage example, to make escape chars work
// <p [innerHTML]="(object.area | kvadratM)" ></p>