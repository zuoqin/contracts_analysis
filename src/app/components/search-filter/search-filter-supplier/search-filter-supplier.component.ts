import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Router } from '@angular/router';
import { CONFIG } from '../../../config';

@Component({
    selector:'search-filter-supplier',
    templateUrl:'./search-filter-supplier.component.html'
})


export class SearchFilterSupplier implements OnInit{
    searchForm: FormGroup;
    
    queryStr: string;
    dataService: CompleterData;
    ifLoadData:boolean = false;
    seacrhType = CONFIG.seacrhType;
    
    queryhData = [
        { name: 'ООО "Регион Продукт"', value: '1' }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private completerService: CompleterService){
            this.dataService = completerService.local(this.queryhData, 'name', 'name');
        }
    ngOnInit() {
        this.initForm();
    }
    changeType(){
        this.router.navigate([this.searchForm.controls.type.value]);
        
    }
    selectProduct(){
        this.ifLoadData = true;
    }
    initForm(){
        this.searchForm = this.formBuilder.group({
            type: ['supplier', [Validators.required]],
            query: ['', [Validators.required]],
            volumeFrom: ['', [Validators.required]],
			volumeTo: ['', [Validators.required]],
            unit:['1', [Validators.required]],
            region:['1', [Validators.required]],
            typeSupplier:['1', [Validators.required]],
		});
    }
    
}