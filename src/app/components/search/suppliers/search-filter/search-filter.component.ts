import { Component, OnInit,Output,Input,EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleterService,RemoteData } from 'ng2-completer';
import { Router } from '@angular/router';
import { environment } from '@environments';
import { CONFIG } from '@config';

/*Plugins*/
import { NgOption } from '@ng-select/ng-select';

/*Services*/
import { ProductServices } from '@core';


@Component({
    selector:'search-filter-supplier',
    templateUrl:'./search-filter.component.html'
})

export class SearchFilterSupplierComponent implements OnInit{
    searchForm: FormGroup;
    checkRequired:boolean = true;
    queryStr: string;
    selectedSupplier;
    dataService: RemoteData;
    ifLoadData:boolean = false;
    seacrhType = CONFIG.seacrhType;
    autocompleteSupplier = CONFIG.autocompleteSupplier;
    @Input() loadData: boolean;
    @Output() onLoadData: EventEmitter<any> = new EventEmitter<any>();
    regions: NgOption[] = []
    btnText = {
        text:"Найти",
        defaultValue:"Найти",
        load:"Поиск.."
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productServices:ProductServices,
        private completerService: CompleterService){
            this.dataService = completerService.remote(`${environment.apiUrl}/search_supplier?query=` ,'supplier_name','supplier_name');
            this.dataService.dataField("suppliers");
        }


    ngOnInit() {
        this.initForm();
        this.getRegions()   
    }
    changeType(){
        this.router.navigate(['search',this.searchForm.controls.type.value]);
        
    }
    selectSupplier(selected){
    


        if(selected){
            this.selectedSupplier = selected.originalObject;
            this.searchForm.controls['query'].setValue(this.selectedSupplier.name)
            this.checkRequired = true;
        }else{
            this.selectedSupplier = null;
            this.searchForm.controls['query'].setValue('')
            this.checkRequired = false;
        }
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

    search(){
      
        if(!this.checkRequired){
            return;
        }
        
        this.btnText.text = this.btnText.load;


        /*TODO: временно */
        this.ifLoadData = true;
        this.onLoadData.emit(this.selectedSupplier);
        this.btnText.text = this.btnText.defaultValue;
        return;
    }
    getRegions(){
        this.productServices.getRegions().subscribe(
            response => {
                this.regions = response.data
            },
            err => {
                console.log(err)
            }
        );
    }
    
}