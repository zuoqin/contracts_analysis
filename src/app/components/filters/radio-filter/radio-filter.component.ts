import { Component,Output,EventEmitter, Input } from '@angular/core';


@Component({
    selector:"radio-filter",
    templateUrl:"./radio-filter.component.html"
})
export class RadioFilterComponent{
    @Output() 
    onSelectValue: EventEmitter<any> = new EventEmitter<any>();
    @Input('fieldName') fieldName;
    value:boolean = true;
    ifSubmit:boolean = false;
    save(event){
        this.close(event)
        this.ifSubmit = true;
        this.onSelectValue.emit(this.value)
    }
    clear(event){
        this.ifSubmit = false;
        this.close(event)
        this.value = true;
        this.onSelectValue.emit(this.value)
    }

    close(event){
        event.target.closest(".popup-form").classList.remove("active")
    }

}