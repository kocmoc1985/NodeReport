import {Pipe, PipeTransform} from '@angular/core';

//#PIPE ANGULAR
@Pipe({name: 'pricekr'})
export class PriceKr implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) return value;
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr";
    }
}

// Usage example, to make escape chars work
// <p [innerHTML]="(object.area | kvadratM)" ></p>