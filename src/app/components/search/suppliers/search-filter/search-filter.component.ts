import { Component, OnInit,ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CONFIG } from '@config';



/*Services*/
import { SuppliersServices } from '@core';


@Component({
    selector:'search-filter-supplier',
    templateUrl:'./search-filter.component.html'
})

export class SearchFilterSupplierComponent implements OnInit{
    @ViewChild("autoCompleteSupplierInput") autoCompleteSupplierInput;
    searchForm: FormGroup;
    checkRequired:boolean = true;
    queryStr: string;

    selectedSupplier;
    seacrhType = CONFIG.seacrhType;
    autocompleteSupplier = CONFIG.autocompleteSupplier;
    supplierFromUrl = {
        supplier_id:null,
        name:null
    };

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private suppliersServices: SuppliersServices,
        private activatedRoute: ActivatedRoute){
            this.activatedRoute.queryParams.subscribe((params: Params) => {
                if(params.supplier_name && params.supplier_id){
                    this.supplierFromUrl.supplier_id = params.supplier_id;
                    this.supplierFromUrl.name = params.supplier_name;
                    setTimeout(()=>{
                        this.autoCompleteSupplierInput.setValue(params.supplier_name)
                    })
                }
            });
        }


    ngOnInit() {
        this.initForm();
        if(this.supplierFromUrl.supplier_id && this.supplierFromUrl.name){
            this.selectSupplier({supplier_id: this.supplierFromUrl.supplier_id, name: this.supplierFromUrl.name});
            window.history.pushState('', 'title', '/search/supplier');
        }

        // setTimeout(()=>{
        //     this.selectSupplier({supplier_id: 2457, name: 'test'})
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