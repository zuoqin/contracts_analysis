
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[MaxValue]'
})
export class MaxValue {
    constructor(private el: ElementRef) { }
    @Input() MaxValue: any;
    @Input() FormControl: any;
    @HostListener('blur', ['$event']) onKeyDown(event) {
        console.log(this.MaxValue)

        if(this.MaxValue){
            let currentValue = parseFloat(event.target.value);
            this.MaxValue = parseFloat(this.MaxValue)
            if(currentValue>=this.MaxValue){
                this.FormControl.setValue(this.MaxValue-1);
            }
        }
 
    }
}
