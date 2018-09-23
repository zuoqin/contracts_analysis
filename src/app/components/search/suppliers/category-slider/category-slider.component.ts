import { Component,OnInit, ViewEncapsulation } from '@angular/core';

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

      slideConfig = {"slidesToShow": 4, "slidesToScroll": 1};
     
     
    selectProduct(category,product){
        this.selectedCategory = category;
        this.selectedProduct = product;
    }
     
      afterChange(e) {
        console.log('afterChange');
      }
}