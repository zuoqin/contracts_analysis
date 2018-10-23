import { Component, OnInit,Output,Input,EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleterService,RemoteData } from 'ng2-completer';
import { Router } from '@angular/router';
import { environment } from '@environments';
import { CONFIG } from '@config';

/*Plugins*/
import { NgOption } from '@ng-select/ng-select';

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
    regions: NgOption[] = [
        {
            name:"г. Москва", 
            id:"1"
        },
        {
            name:"ЦФО", 
            id:"2"
        },
        {
            name:"Вне ЦФО",
            id:"3"
        },
        {
            name:"Европейская часть России", 
            id:"4"
        },
        {
            name:"Республика Адыгея", 
            id:"5"
        },
        {
            name:"Республика Башкортостан", 
            id:"6"
        },
    ]
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
    
}