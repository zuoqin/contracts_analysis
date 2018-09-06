import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Router } from '@angular/router';
import { CONFIG } from '@config';

@Component({
    selector:'search-filter-spgz',
    templateUrl:'./search-filter-spgz.component.html'
})

export class SearchFilterSpgz implements OnInit{
    searchForm: FormGroup;
    
    queryStr: string;
    dataService: CompleterData;
    ifLoadData:boolean = false;
    seacrhType = CONFIG.seacrhType;
    btnText = {
        text:"Найти",
        defaultValue:"Найти",
        load:"Поиск.."
    }
    queryhData = [
        { name: 'ЙОГУРТЫ', value: '1' }
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
        this.router.navigate(['search',this.searchForm.controls.type.value]);
        
    }
    selectProduct(){
        this.ifLoadData = true;
    }
    initForm(){
        this.searchForm = this.formBuilder.group({
            type: ['spgz', [Validators.required]],
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