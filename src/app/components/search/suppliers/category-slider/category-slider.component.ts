import { Component,OnInit, ViewEncapsulation} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/*Srvices */
import { SuppliersServices } from '@core';

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
    constructor(
          private suppliersServices:SuppliersServices
    ){
        this.suppliersServices.SelectSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedSupplier)=>{
                this.selectedSupplier = selectedSupplier;
    
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
                        console.log(response)
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
        this.suppliersServices.selectProductSupplierSubject.next(this.selectedProduct)
        console.log(this.selectedCategory)
    }
     
    afterChange(e) {
        console.log('afterChange');
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}


