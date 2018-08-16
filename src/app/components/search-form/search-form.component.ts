import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
    selector:'search-form',
    templateUrl:'./search-form.component.html'
})

export class SearchFormComponent implements OnInit{
    searchProductForm: FormGroup;
    
    queryStr: string;
    dataService: CompleterData;

    queryhData = [
        { name: 'ЙОГУРТЫ', value: '1' }

    ];

    constructor(
        private formBuilder: FormBuilder,
        private completerService: CompleterService){
            this.dataService = completerService.local(this.queryhData, 'name', 'name');
        }
    ngOnInit() {
        this.initForm();
    }
    initForm(){
        this.searchProductForm = this.formBuilder.group({
            type: ['product', [Validators.required]],
            query: ['', [Validators.required]],
            volumeFrom: ['', [Validators.required]],
			volumeTo: ['', [Validators.required]],
            unit:['1', [Validators.required]],
            region:['1', [Validators.required]],
            deliveryFrom:['', [Validators.required]],
            deliveryTo:['', [Validators.required]],
		});
    }
    
}