import { Component,Output,EventEmitter, Input } from '@angular/core';

@Component({
    selector:"list-filter",
    templateUrl:"./list-filter.component.html"
})
export class ListFilterComponent{
    @Output() 
    onSelectValue: EventEmitter<any> = new EventEmitter<any>();
    @Input('valuesArray') valuesArray;
    valuesSelected = [];
    ifSubmit:boolean = false;
    save(event){
        if(!this.valuesSelected.length){
            return false;
        }
        this.close(event)
        this.ifSubmit = true;
        this.onSelectValue.emit(this.valuesSelected)
    }
    clear(event){
        var clist = document.getElementsByTagName("input");
        for (var i = 0; i < clist.length; ++i) { 
            clist[i].checked = false; 
        }
        this.ifSubmit = false;
        this.close(event)
        this.valuesSelected = [];
        this.onSelectValue.emit(this.valuesSelected)
    }
    selectValue(event){
       
        if(event.target.checked){
            this.valuesSelected.push(event.target.value)
        }else{
            let index = this.valuesSelected.indexOf(event.target.value);
            if (index !== -1) this.valuesSelected.splice(index, 1);
        }
    }
    close(event){
        event.target.closest(".popup-form").classList.remove("active")
    }

}