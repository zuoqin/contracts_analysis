import { Component, OnInit,Output,EventEmitter,HostListener,ViewChild,ElementRef } from "@angular/core";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/*Services */
import { ProductServices } from '@core';
/*Models*/
import { ProductSearch } from '@core';
/*Plugins */
import { NgOption } from '@ng-select/ng-select';

import { CONFIG } from '@config';
@Component({
    selector:'search-filter-product',
    templateUrl:'./search-filter-product.component.html'
})

export class SearchFilterProduct implements OnInit{
    @ViewChild("autoCompleteProductInput") autoCompleteProductInput;
    @Output() showContent: EventEmitter<any> = new EventEmitter<any>();
    unsubscribeAll = new Subject();
    searchForm: FormGroup;
    checkRequired:boolean = true;
    selectedProduct:ProductSearch;
    selectedAttrs = [];
    selectedRegions = [];
    units = [];
    attrsProduct = [];
    shortFilterArray = [];
    regions: NgOption[] = []
    searchType:string;
    fixedFilter:boolean = false;
    fixedShortFilterShow:boolean = false;
    ifDisabledProduct:boolean = false;

    heightFilter;

    seacrhType = CONFIG.seacrhType;
    autocompleteProduct= CONFIG.autocompleteProduct;
    autocompleteSpgz = CONFIG.autocompleteSPGZ;


    constructor(
        private productServices:ProductServices,
        private formBuilder: FormBuilder,
        private router: Router,
    ){
        
        this.productServices.SearchByNewProductObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(selectedProduct=>{
                /*Select new product from catgeries select */
                this.searchType = 'product';
                this.searchForm.controls['type'].setValue('product');
                setTimeout(()=>{
                    this.autoCompleteProductInput.setValue(selectedProduct.name)
                })
          
                this.selectProduct(selectedProduct,true);
            })
    }
    

    ngOnInit() {
        this.initForm();

        if(this.router.url.indexOf('spgz')>=0){
            this.searchType = 'spgz';
            this.searchForm.controls['type'].setValue('spgz');
        }else{
            this.searchType = 'product';
            this.searchForm.controls['type'].setValue('product');
        }
        this.searchForm.valueChanges.subscribe(() => {
            this.shortFilterInit()
        })
        this.getRegions()   

        // this.selectProduct({kpgz_id: 8515, name: "Мясо индейки"})
        // setTimeout(()=>{
        //     this.search()
        // },500)        

    }
    initForm(){
        this.searchForm = this.formBuilder.group({
            type: ['product'],
            query: ['', [Validators.required]],
            volumeFrom: [null],
			volumeTo: [null],
            unit:[null],
            region:[false],
            deliveryFrom:[null],
            deliveryTo:[null],
            risk:[false]
        });
        this.shortFilterInit()
    }
    selectProduct(selected,selectFromCategory?){
        this.showContent.emit(false);
        this.resetFilters()
        if(selected){
            if(selectFromCategory){
                this.selectedProduct.selectedFromCategory = true;
            }
            this.selectedProduct.name = selected.name;
            this.selectedProduct.kpgz_id = selected.kpgz_id;
            this.searchForm.controls['query'].setValue(this.selectedProduct.name)
            this.checkRequired = true;
            this.getAttrs();
            this.getUnits();
       
        }
        this.shortFilterInit()
    }
    onChangeVolume(){
        this.showContent.emit(false);
    }
    changeType(){
        this.resetFilters()
        this.router.navigate(['search',this.searchForm.controls.type.value]);
    }
   
    resetFilters(){
        this.attrsProduct = [];
        this.units = [];
        this.searchForm.controls['unit'].setValue(null)
        this.selectedProduct = {
            name: null,
            spgz_id: [],
            kpgz_id: null,
            risk: null,
            region_id: [],
            delivery_from: null,
            delivery_to: null,
            volume_from: null,
            volume_to: null,
            unit_id: null,
            unit_text:null
        };
        this.searchForm.controls['query'].setValue('')
        this.checkRequired = false;
    }
    selectAttr(event,attr){
        if(event.target.checked){
            this.selectedAttrs.push(attr)
        }else{
            let index = this.selectedAttrs.indexOf(attr);
            if(index>=0){
                this.selectedAttrs.splice(index, 1);
            }
        }
        if(this.selectedAttrs.length){
            let arrayAttr = [];
            this.selectedAttrs.map(item=>arrayAttr.push(item.value_id))
            this.getSpgz(arrayAttr)
        }else{
            this.getSpgz()
        }
   

        this.shortFilterInit()
    }
    getAttrs(){
        this.productServices.getAttrs(this.selectedProduct.kpgz_id).subscribe(
            response => {
                this.attrsProduct = response.data;
            },
            err => {
                console.log(err)
            }
        );
    }
    getSpgz(atrr?){
        return this.productServices.getSpgz(this.selectedProduct.kpgz_id,atrr).subscribe(
            response => {
                this.selectedProduct.spgz_id = response.data;
                this.checkDisabledProduct();
                if(this.selectedProduct.selectedFromCategory){
                    this.search()
                }
            },
            err => {
                console.log(err)
            }
        );
    }
    checkDisabledProduct(){
        if(!this.units.length || !this.selectedProduct.spgz_id.length){
            this.ifDisabledProduct = true;
        }else{
            this.ifDisabledProduct = false;
        }
    }
    getUnits(){
        this.productServices.getUnits(this.selectedProduct.kpgz_id).subscribe(
            response => {
                this.units = response.data;
                if(response.data.length){
                    this.searchForm.controls['unit'].setValue(this.units[0].unit_id);
                }else{
                    this.searchForm.controls['unit'].setValue(null)
                }
                this.getSpgz()

            },
            err => {
                console.log(err)
            }
        );
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
    selectRegions(value){
        if(value){
            this.selectedRegions = value;
            let array = [];
            this.selectedRegions.map(region=>{
                array.push(region.id)
            })
            this.searchForm.controls['region'].setValue(array);
        }else{
            this.selectedRegions = [];
            this.searchForm.controls['region'].setValue(false);
        }
        this.shortFilterInit();
        this.selectedProduct.region_id = [];
        this.selectedRegions.map(item=>{
            this.selectedProduct.region_id.push(item.id);
        })
    }
    search(){
        this.checkDisabledProduct()

        if(!this.checkRequired || this.ifDisabledProduct){
            return;
        }

        this.hideFixedFilter();
        this.selectedProduct.delivery_from = this.searchForm.value.deliveryFrom;
        this.selectedProduct.delivery_to = this.searchForm.value.deliveryTo;
        this.selectedProduct.volume_from = this.searchForm.value.volumeFrom;
        this.selectedProduct.volume_to = this.searchForm.value.volumeTo;
        this.selectedProduct.unit_id = this.searchForm.value.unit;
        if(this.units.length){
            this.selectedProduct.unit_text = this.units.filter(unit=>unit.unit_id==this.searchForm.value.unit)[0].abbreviation;
        }

        this.selectedProduct.risk = this.searchForm.value.risk.toString();

        this.showContent.emit(true);
        this.productServices.SelectProductSubject.next(this.selectedProduct)

    }

    @ViewChild('filter') filter: ElementRef;

    @HostListener("window:scroll", []) onWindowScroll() {
        // do some stuff here when the window is scrolled
            const verticalOffset = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        
            let filter = document.getElementById('search-filter')
            if(verticalOffset>this.filter.nativeElement.offsetHeight+100){
                if(!this.fixedFilter){
                    this.fixedShortFilterShow = true;
                    this.heightFilter = this.filter.nativeElement.offsetHeight +'px';
                    filter.classList.add('hidden');
                    filter.classList.remove('visible');
                  
                }
            
            }else{

                this.fixedFilter = false;
                this.fixedShortFilterShow = false;
                filter.classList.add('visible');
                filter.classList.remove('hidden');
                this.heightFilter = 'auto';
            }
          
        }



    shortFilterInit(){
        this.shortFilterArray = [];


        let typeSearch = this.seacrhType.filter(item=>item.id==this.searchForm.controls['type'].value)[0];
      
        this.shortFilterArray.push({
            name:"Тип поиска:",
            value:typeSearch.name
        })
        if(this.searchForm.controls['query'].value){
            this.shortFilterArray.push({
                name:"Строка поиска:",
                value:this.searchForm.controls['query'].value
            })
        }
        let regionText;

        if(this.selectedRegions.length){

            this.selectedRegions.map(region=>{
                if(regionText){
                    regionText += ', '+region.name;
                }else{
                    regionText = region.name;
                }
              
            })
        }else{
            regionText = "По всей России"
        }
        this.shortFilterArray.push({
            name:"Регион:",
            value:regionText
        })
      

        if(this.searchForm.controls['volumeFrom'].value || this.searchForm.controls['volumeTo'].value){
            let text = '';
            let unit = this.units.filter(item=>item.id==this.searchForm.controls['unit'].value)[0].name;
            if(this.searchForm.controls['volumeFrom'].value){
                text = `От ${this.searchForm.controls['volumeFrom'].value}`;
            }
            if(this.searchForm.controls['volumeTo'].value){
                text += ` до ${this.searchForm.controls['volumeTo'].value}`;
            }
            this.shortFilterArray.push({
                name:"Объем:",
                value:text + ` (${unit})`
            })
        }
        if(this.searchForm.controls['deliveryFrom'].value || this.searchForm.controls['deliveryTo'].value){
            let text = '';

            if(this.searchForm.controls['deliveryFrom'].value){
                text = `От ${this.searchForm.controls['deliveryFrom'].value}`;
            }
            if(this.searchForm.controls['deliveryTo'].value){
                text += ` до ${this.searchForm.controls['deliveryTo'].value}`;
            }
            this.shortFilterArray.push({
                name:"Объем:",
                value:text + ` (дней)`
            })
        }

        
        if(this.selectedAttrs.length){
            let text = '';
            this.selectedAttrs.map(attr=>{
                if(text){
                    text += ', '+attr.name;
                }else{
                    text = attr.name;
                }
              
            })
            this.shortFilterArray.push({
                name:"Характеристики:",
                value:text 
            })
        }

        this.shortFilterArray.push({
            name:"Учитывать при расчете рисковых поставщиков: ",
            value:this.searchForm.controls['risk'].value ? 'да':'нет'
        })
    }
    showFixedFilter(){
 
        this.fixedShortFilterShow = false;
        setTimeout(()=>{
            this.fixedFilter = true;
        },500)
 

    }
    hideFixedFilter(){
        if(this.fixedFilter){
            this.fixedFilter = false;
  
            setTimeout(()=>{
                this.fixedShortFilterShow = true;
            
            },500)
        }

    }
 
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}