import { Component, OnInit,Output,Input,EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleterService,RemoteData } from 'ng2-completer';
import { Router } from '@angular/router';
import { environment } from '@environments';
import { CONFIG } from '@config';

@Component({
    selector:'search-filter-supplier',
    templateUrl:'./search-filter.component.html'
})

export class SearchFilterSupplierComponent implements OnInit{
    searchForm: FormGroup;
    
    queryStr: string;
    dataService: RemoteData;
    ifLoadData:boolean = false;
    seacrhType = CONFIG.seacrhType;
    autocompleteSupplier = CONFIG.autocompleteSupplier;
    @Input() loadData: boolean;
    @Output() onLoadData: EventEmitter<any> = new EventEmitter<any>();

    btnText = {
        text:"Найти",
        defaultValue:"Найти",
        load:"Поиск.."
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private completerService: CompleterService){
            this.dataService = completerService.remote(`${environment.apiUrl}/search_supplier?query=` ,'supplier_name','supplier_name');
            this.dataService.dataField("suppliers");
        }
    ngOnInit() {
        this.initForm();
    }
    changeType(){
        this.router.navigate(['search',this.searchForm.controls.type.value]);
        
    }
    selectSupplier(event){
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