import { Component, OnInit,Output,EventEmitter,Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONFIG } from '@config';
import { environment } from '@environments';
import { ProductServices } from '@core';

@Component({
    selector:'search-filter-product',
    templateUrl:'./search-filter-product.component.html'
})

export class SearchFilterProduct implements OnInit{
    searchForm: FormGroup;
    checkRequired:boolean = true;
    ifLoadData:boolean = false;
    seacrhType = CONFIG.seacrhType;
    selectedProduct = null;
    product = null;
    btnText = {
        text:"Найти",
        defaultValue:"Найти",
        load:"Поиск.."
    }
    autocompleteProduct= CONFIG.autocompleteProduct;
    @Input() loadData: boolean;
    @Output() onLoadData: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private productServices:ProductServices,
        private formBuilder: FormBuilder,
        private router: Router,
      ){}
    ngOnInit() {
        this.initForm();
    }
    changeType(){
        console.log(this.searchForm.controls.type.value)
        this.router.navigate(['search',this.searchForm.controls.type.value]);
    }
    selectProduct(selected){
        console.log(selected)
        if(selected){
            this.selectedProduct = selected;
           console.log( this.selectedProduct)
        }
        this.ifLoadData = true;
        this.checkRequired = true;
    }
    initForm(){
        this.searchForm = this.formBuilder.group({
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
    search(){
        console.log(this.searchForm)
        if(!this.ifLoadData){
            this.checkRequired = false;
            return false;
        }
        this.btnText.text = this.btnText.load;

        this.productServices.get(this.selectedProduct.kpgzName).subscribe(
            product => {
                this.product = product;
                this.onLoadData.emit(true);
                this.btnText.text = this.btnText.defaultValue;
            },
            err => {
                this.btnText.text = this.btnText.defaultValue;
                console.log(err)
            }
          );

     
    }
    
}