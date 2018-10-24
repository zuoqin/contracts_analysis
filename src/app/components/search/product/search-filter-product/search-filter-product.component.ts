import { Component, OnInit,Output,EventEmitter,Input,HostListener,ViewChild,ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONFIG } from '@config';
import { environment } from '@environments';
import { ProductServices } from '@core';
import { NgOption } from '@ng-select/ng-select';
/*Models*/
import { ProductSearch } from '@core';
@Component({
    selector:'search-filter-product',
    templateUrl:'./search-filter-product.component.html'
})

export class SearchFilterProduct implements OnInit{
    searchForm: FormGroup;
    checkRequired:boolean = true;
    ifLoadData:boolean = false;
    seacrhType = CONFIG.seacrhType;
    selectedProduct:ProductSearch;
    selectedAttrs = [];
    product = null;
    btnText = {
        text:"Найти",
        defaultValue:"Найти",
        load:"Поиск.."
    }
    selectedRegions = [];
    units = [];
    attrsProduct = [];
    searchType:string;
    fixedFilter:boolean = false;
    fixedShortFilterShow:boolean = false;
    heightFilter;
    shortFilterArray = [];

    @ViewChild("autoCompleteProductInput") autoCompleteProductInput;
    regions: NgOption[] = []
    autocompleteProduct= CONFIG.autocompleteProduct;
    autocompleteSpgz = CONFIG.autocompleteSPGZ;
    @Input() loadData: boolean;
    @Output() onLoadData: EventEmitter<any> = new EventEmitter<any>();
    tempValue;
    constructor(
        private productServices:ProductServices,
        private formBuilder: FormBuilder,
        private router: Router,
    ){
        
        this.productServices.SearchByNewProductObservable
            .subscribe((selectedProduct)=>{
                /*Select new product from catgeries select */

                console.log(selectedProduct)
                this.autoCompleteProductInput.setValue(selectedProduct.name)
                this.selectProduct(selectedProduct);
                this.search()
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
        // this.selectProduct({kpgz_id: 6568, name: "Огурцы"})
        // setTimeout(()=>{
        //     this.search()
        // },1500)


        

    }
    changeType(){
  
        this.router.navigate(['search',this.searchForm.controls.type.value]);
    }
    selectProduct(selected){
        console.log(selected)
        this.resetFilters()
        if(selected){
            this.selectedProduct.name = selected.name;
            this.selectedProduct.kpgz_id = selected.kpgz_id;
            this.searchForm.controls['query'].setValue(this.selectedProduct.name)
            this.checkRequired = true;
            this.getUnits();
            this.getAttrs();
            this.getSpgz()
        }
        this.onLoadData.emit(false);
        this.shortFilterInit()
    }
    resetFilters(){
        this.attrsProduct = [];
        this.units = [];
        this.searchForm.controls['unit'].setValue('')
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
    getSpgz(){
        return this.productServices.getSpgz(this.selectedProduct.kpgz_id).subscribe(
            response => {
                this.selectedProduct.spgz_id = response.data;
            },
            err => {
                console.log(err)
            }
        );
    }
    getUnits(){
        this.productServices.getUnits(this.selectedProduct.kpgz_id).subscribe(
            response => {
                if(response.data.length){
                    this.units = response.data;
                 
                    this.searchForm.controls['unit'].setValue(this.units[0].unit_id)
                }else{
                    this.units = [];
                    this.searchForm.controls['unit'].setValue('')
                }
            },
            err => {
                console.log(err)
            }
        );
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
        //console.log(this.selectedProduct.region_id)
        this.selectedProduct.region_id = [];
        this.selectedRegions.map(item=>{
            this.selectedProduct.region_id.push(item.id);
        })
   
    }
    search(){
      



        if(!this.checkRequired){
            return;
        }
        
        this.btnText.text = this.btnText.load;
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
        
        this.ifLoadData = true;
        this.btnText.text = this.btnText.defaultValue;
        this.onLoadData.emit(true);
        console.log(this.selectedProduct)
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