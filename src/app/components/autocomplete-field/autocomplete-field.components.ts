import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { CompleterService, CompleterData,CompleterItem } from 'ng2-completer';
import { environment } from '@environments';
@Component({
    selector:"autocomplete-field",
    templateUrl:"./autocomplete-field.component.html"
})
export class AutocompleteFieldComponent implements OnInit{
    @Input() placeholder;
    @Input() urlSearch;
    @Input() searchFields;
    @Input() titleField;
    @Input() formControlName;
    @Output() onSelectedValue = new EventEmitter<any>();
    question = [];

    dataService: CompleterData;
    constructor(
        private completerService: CompleterService
    ){}
    onSelected(value){
        this.onSelectedValue.emit(value.originalObject);
    }
    ngOnInit(){
        console.log(this.urlSearch)
        this.dataService = this.completerService.remote(environment.apiUrl+this.urlSearch ,this.searchFields,this.titleField);
    }
}