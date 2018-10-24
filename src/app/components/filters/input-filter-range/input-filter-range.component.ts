import { Component,Output,EventEmitter, Input } from '@angular/core';

@Component({
    selector:"input-filter-range",
    templateUrl:"./input-filter-range.component.html"
})
export class InputFilterRangeComponent{
    @Output() 
    onEnterValue: EventEmitter<any> = new EventEmitter<any>();
    from;
    to;
    @Input('minValue') minValue;
    @Input('maxValue') maxValue;
    @Input('placeholder') placeholder;
    ifSubmit:boolean = false;

    save(event){
        if(!this.from && !this.to){
            return false;
        }
        this.close(event)
        if(!this.from){
            this.from = this.minValue;
        }
        if(!this.to){
            this.to = this.maxValue;
        }
        this.ifSubmit = true;
        this.onEnterValue.emit({from:this.from,to:this.to})
    }
    clear(event){
        this.ifSubmit = false;
        this.close(event)
        this.from = null;
        this.to = null
        this.onEnterValue.emit(null)
    }
    close(event){
        
        event.target.closest(".popup-form").classList.remove("active")
    }

}