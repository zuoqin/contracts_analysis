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

@Pipe({name: 'numberDot'})
export class NumberDotPipe implements PipeTransform {
  transform(value : string): string {
    if(value && value.toString().length>0){
      value = value.toString();
      var n = value.indexOf(".");
      if( n <= 0 ){
          n = value.indexOf(",");
      }
      if( n >= 0 ){
          value = value.replace(/\./g, ",");
          if( (value.length - n) <= 2 ){
              value = value.toString() + "0";
          }
          return value;
      }
      else{
          return value + ",00";
      }
    }
  }
}
