import { Component, OnInit,Output,EventEmitter,Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Router } from '@angular/router';
import { CONFIG } from './../../../../config';

@Component({
    selector:'search-filter-product',
    templateUrl:'./search-filter-product.component.html'
})

export class SearchFilterProduct implements OnInit{
    searchForm: FormGroup;
    
    queryStr: string;
    dataService: CompleterData;
    ifLoadData:boolean = false;
    seacrhType = CONFIG.seacrhType;
    @Input() loadData: boolean;
   // @Output() loadData = new EventEmitter<boolean>();
   @Output() onLoadData: EventEmitter<any> = new EventEmitter<any>();



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
        this.router.navigate([this.searchForm.controls.type.value]);
    }
    selectProduct(){
        this.ifLoadData = true;
        this.onLoadData.emit(true);
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
    
}