import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/*Services*/
import { ProductServices } from '@core';
/*Models*/
import { ProductSearch } from '@core';

@Component({
    selector:"search",
    templateUrl:"./search-product.component.html"
})
export class SearchProductComponent{
    unsubscribeAll = new Subject();
    showContent:boolean = false;
    selectedProduct:ProductSearch;
    purchaseDataArray;
    constructor(
        private productServices:ProductServices
    ){
        this.productServices.SearchByNewProductObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedProduct)=>{
                this.selectedProduct = selectedProduct;
                this.purchaseDataArray = null;
            })
        this.productServices.SelectProductObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedProduct)=>{
                this.selectedProduct = selectedProduct;
                this.purchaseDataArray = null;
                this.getPurchases()
            })  
    }
    
    showContentEvent(value){
        this.showContent = value;
    }
    getPurchases(){
        this.productServices.getPurchases(this.selectedProduct).subscribe(
            response => {
                this.purchaseDataArray = response.data;
            },
            err => {
                console.log(err)
            }
        );
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
    


}
