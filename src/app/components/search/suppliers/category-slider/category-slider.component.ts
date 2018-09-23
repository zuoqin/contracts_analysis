import { Component,OnInit, ViewEncapsulation, Output,EventEmitter } from '@angular/core';

/*Srvices */
import { SuppliersServices } from '@core';

@Component({
    selector:"category-slider",
    templateUrl:"./category-slider.component.html",
    styleUrls: ['./category-slider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategorySliderComponent implements OnInit{
    categories;
    selectedCategory;
    selectedProduct;

    @Output() onSelect = new EventEmitter<any>();
    constructor(
          private suppliersServices:SuppliersServices
    ){}
      ngOnInit(){
            this.getCategories()
      }
      getCategories(){
            this.suppliersServices.getCategories('1')
            .subscribe(
                request => {
                    this.categories = request;
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
        this.onSelect.emit(this.selectedProduct);
    }
     
      afterChange(e) {
        console.log('afterChange');
      }
}


