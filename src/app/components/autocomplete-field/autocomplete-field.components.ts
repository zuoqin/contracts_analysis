import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { CompleterService, CompleterData,CompleterItem,RemoteData } from 'ng2-completer';
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
    @Input() initialValue?: string;
    @Input() searchData;
    @Output() onSelectedValue = new EventEmitter<any>();
    
    question = [];

    dataService: RemoteData;
    constructor(
        private completerService: CompleterService
    ){}

    onSelected(value){
        if(value){
            this.onSelectedValue.emit(value.originalObject);
        }
       
    }
    setValue(name: string){
        console.log(1)
        this.initialValue = name;
    }
    ngOnInit(){
       
        if(!this.searchData){
            this.dataService = this.completerService.remote(environment.apiUrl+this.urlSearch ,this.searchFields,this.titleField);
            this.dataService.dataField("data");
        }else{
            //this.dataService = this.completerService.local(this.searchData, this.searchFields, this.titleField);
        }
    }
}