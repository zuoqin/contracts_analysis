import { Component,OnInit, ViewEncapsulation} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/*Srvices */
import { SuppliersServices,ProductServices } from '@core';

@Component({
    selector:"category-slider",
    templateUrl:"./category-slider.component.html",
    styleUrls: ['./category-slider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategorySliderComponent implements OnInit{
    unsubscribeAll = new Subject();
    categories;
    selectedCategory;
    selectedProduct;
    selectedSupplier;
    units;
    currentUnits;
    constructor(
            private productServices:ProductServices,
          private suppliersServices:SuppliersServices
    ){
        this.suppliersServices.SelectSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedSupplier)=>{
                this.selectedSupplier = selectedSupplier;
                this.units = null;
                this.getCategories()
            })
    }
      ngOnInit(){
           // this.getCategories()
      }
      getCategories(){
            this.suppliersServices.getCategoriesSupplier(this.selectedSupplier.supplier_id)
                .subscribe(
                    response => {
                        this.categories = response.data;
            
                        //this.categories = request;
                    },
                    err => {
                        
                    }
                );
      }

      slideConfig = {
        "infinite": false,
          "slidesToShow": 4, 
          "slidesToScroll": 1
        };
     
     
    selectProduct(category,product){
  
        this.selectedCategory = category;
        this.selectedProduct = product;
 
        console.log(this.selectedProduct)
        this.getUnits()



    }
     
    getUnits(){
        this.productServices.getUnits(null,this.selectedProduct.spgz_id).subscribe(
            response => {
                if(response.data.length){
                    this.units = response.data;
                    this.currentUnits = this.units[0].unit_id;


                    let unit = this.units.filter(unit=>unit.unit_id==this.currentUnits)[0];
                    this.selectedProduct['unit_id'] =  unit.unit_id;
                    this.selectedProduct['unit'] =  unit;

                    this.suppliersServices.selectProductSupplierSubject.next(this.selectedProduct)
                   
                }else{
                    this.units = null;
                }
            },
            err => {
                console.log(err)
            }
        );
    }
    changeUnits(){
      

        let unit = this.units.filter(unit=>unit.unit_id==this.currentUnits)[0];
        this.selectedProduct['unit_id'] =  unit.unit_id;
        this.selectedProduct['unit'] =  unit;
        this.suppliersServices.selectProductSupplierSubject.next(this.selectedProduct)
    }
    afterChange(e) {
        console.log('afterChange');
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}


