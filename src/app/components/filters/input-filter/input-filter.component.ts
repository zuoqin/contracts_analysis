import { Component,Output,EventEmitter } from '@angular/core';

@Component({
    selector:"input-filter",
    templateUrl:"./input-filter.component.html"
})
export class InputFilterComponent{
    @Output() 
    onEnterValue: EventEmitter<any> = new EventEmitter<any>();
    value;
    ifSubmit:boolean = false;
    save(event){
        if(!this.value){
            return false;
        }
        this.close(event)
        this.ifSubmit = true;
        this.onEnterValue.emit(this.value.toLowerCase())
    }
    clear(event){
        this.ifSubmit = false;
        this.close(event)
        this.value = null;
        this.onEnterValue.emit(this.value)
    }
    close(event){
        event.target.closest(".popup-form").classList.remove("active")
    }

}