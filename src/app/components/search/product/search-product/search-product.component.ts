import { Component, OnInit } from '@angular/core';
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
export class SearchProductComponent implements OnInit{
    unsubscribeAll = new Subject();
    loadData:boolean = false;
    selectedProduct:ProductSearch;
    purchaseDataArray;
    constructor(
        private productServices:ProductServices
    ){
        this.productServices.SearchByNewProductObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedProduct)=>{
                this.selectedProduct = selectedProduct;
                console.log('getPurchases')
                
                this.purchaseDataArray = null;
                this.loadData = false;
                
            })
            this.productServices.SelectProductObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedProduct)=>{
                this.selectedProduct = selectedProduct;
                this.purchaseDataArray = null;
                this.getPurchases()
            })

            

    }
    
    onLoadData(data){
        this.selectedProduct = data;
        
        this.loadData = data;
    }
    getPurchases(){
   
        this.productServices.getPurchases(this.selectedProduct).subscribe(
            response => {
                this.purchaseDataArray = response.data;
                console.log(this.purchaseDataArray)
                // if(response.data.length){
                //     this.formatData(response.data)
                // }else{
                //     this.messageResponse.text =  this.messageResponse.noData;
                // }
              
 
                // this.ifLoadData = true;

            },
            err => {
                // this.messageResponse.text =  this.messageResponse.error;
                // this.ifLoadData = true;
                console.log(err)
            }
        );
    }
    ngOnInit(){

    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
    


}
