
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[MinValue]'
})
export class MinValue {
    constructor(private el: ElementRef) { }
    @Input() MinValue: any;
    @Input() FormControl: any;
    @HostListener('blur', ['$event']) onKeyDown(event) {
    
 
        if(this.MinValue){
            let currentValue = parseFloat(event.target.value);
            this.MinValue = parseFloat(this.MinValue)
            if(currentValue<=this.MinValue){
                this.FormControl.setValue(this.MinValue+1);
            }
        }
   
    }
}
