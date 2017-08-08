import {Pipe, PipeTransform} from '@angular/core';

//#PIPE ANGULAR
@Pipe({name: 'special_a'})
export class SpecialA implements PipeTransform {
    transform(value: string, arg1:any): any {
        if (!value) return value;
        var rooms = arg1;
        return `${value} m&#178; / ${rooms} rum`;
    }
}

// Usage example
// <p [innerHTML]="object.area | special_a:object.rooms"></p>

//PIPE RESULT: 74 m² / 3 rum