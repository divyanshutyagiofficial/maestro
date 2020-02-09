import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {

 transform(values: any, input: any) {
   //check if search term is undefined
   if(input === undefined) return values;
   //return updated value array
   return values.filter(function(value){
     return value.senderName.toLowerCase().includes(input.toLowerCase()) ;
   })
 }
}
