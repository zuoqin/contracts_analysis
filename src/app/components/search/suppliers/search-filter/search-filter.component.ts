import { Component, OnInit,Output,Input,EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleterService,RemoteData } from 'ng2-completer';
import { Router } from '@angular/router';
import { environment } from '@environments';
import { CONFIG } from '@config';

/*Plugins*/
import { NgOption } from '@ng-select/ng-select';

/*Services*/
import { ProductServices,SuppliersServices } from '@core';


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
    selectedRegions = [];
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
        private productServices:ProductServices,
        private completerService: CompleterService,
        private suppliersServices: SuppliersServices){
            this.dataService = completerService.remote(`${environment.apiUrl}/search_supplier?query=` ,'supplier_name','supplier_name');
            this.dataService.dataField("suppliers");
        }


    ngOnInit() {
        this.initForm();

        // setTimeout(()=>{
        //     this.selectSupplier({supplier_id: 3129, name: "ООО «РегионПродукт»"})
        //     this.search()
        // },100)
     
    }
    changeType(){
        this.router.navigate(['search',this.searchForm.controls.type.value]);
        
    }
    selectSupplier(selected){
    
        console.log(selected)

        if(selected){
            this.selectedSupplier = selected;
            this.searchForm.controls['query'].setValue(selected.name)
            this.checkRequired = true;
        }else{
            this.selectedSupplier = null;
            this.searchForm.controls['query'].setValue('')
            this.checkRequired = false;
        }
        this.onLoadData.emit(false);
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
        
        this.btnText.text = this.btnText.load;

        
        /*TODO: временно */
        this.ifLoadData = true;
        this.suppliersServices.SelectSupplierSubject.next(this.selectedSupplier)
        this.onLoadData.emit(true);
        this.btnText.text = this.btnText.defaultValue;
        return;
    }

    
}