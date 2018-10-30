import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CONFIG } from '@config';



/*Services*/
import { SuppliersServices } from '@core';


@Component({
    selector:'search-filter-supplier',
    templateUrl:'./search-filter.component.html'
})

export class SearchFilterSupplierComponent implements OnInit{
    searchForm: FormGroup;
    checkRequired:boolean = true;
    queryStr: string;
    selectedSupplier;
    seacrhType = CONFIG.seacrhType;
    autocompleteSupplier = CONFIG.autocompleteSupplier;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private suppliersServices: SuppliersServices){}


    ngOnInit() {
        this.initForm();


        // setTimeout(()=>{
        //     this.selectSupplier({supplier_id: 109, name: ' СХП Вдохновение'});
         
        // },100)
     
    }
    changeType(){
        this.router.navigate(['search',this.searchForm.controls.type.value]);
        
    }
    selectSupplier(selected){
    
        if(selected){
            this.selectedSupplier = selected;
            this.searchForm.controls['query'].setValue(selected.name)
            this.checkRequired = true;
        }else{
            this.selectedSupplier = null;
            this.searchForm.controls['query'].setValue('')
            this.checkRequired = false;
        }
        this.search()
    }
    initForm(){
        this.searchForm = this.formBuilder.group({
            type: ['supplier', [Validators.required]],
            query: ['', [Validators.required]],
		});
    }

    search(){

        if(!this.checkRequired){
            return;
        }

        this.suppliersServices.SelectSupplierSubject.next(this.selectedSupplier)
    }

    
}