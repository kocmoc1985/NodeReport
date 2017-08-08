import {Pipe, PipeTransform} from '@angular/core';

//#PIPE ANGULAR
@Pipe({name: 'cutdate'})
export class DateCutPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) return value;
        return value.substring(0, 10);
    }
}