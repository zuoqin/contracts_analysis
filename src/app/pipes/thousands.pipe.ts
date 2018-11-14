import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'thousandsSpace'})
export class ThousandsSpacePipe implements PipeTransform {
  transform(value): string {
    if(value && value.toString().length>3){
      if(typeof value =="string"){
        value = parseFloat(
                  parseFloat(value).toFixed(2)
                ).toString();
      }else{
        value = parseFloat(value.toFixed(2)).toString();
      }
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(/\./g, ",");
    }else{
      return value.toString().replace(/\./g, ",");
    }
 
  }
}
