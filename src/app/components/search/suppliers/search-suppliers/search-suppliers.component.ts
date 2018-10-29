import { Component,OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/*Services*/
import { SuppliersServices, ProductServices } from '@core';

@Component({
    selector:"search-suppliers",
    templateUrl:"./search-suppliers.component.html"
})
export class SearchSuppliersComponent implements OnInit{
    unsubscribeAll = new Subject();

    showCardSupplier:boolean = false;
    selectedSupplier;

    unitsVolume;
    infoSupplier;
    purchaseDataArray;
    selectedProduct;
    constructor(
        private productServices:ProductServices,
        private suppliersServices:SuppliersServices
    ){
     

        
        this.suppliersServices.SelectSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(selectedSupplier=>{
                this.selectedSupplier=selectedSupplier;
            })

        this.suppliersServices.SupplierInfoObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(infoSupplier=>{
                this.purchaseDataArray = null;
                this.infoSupplier = infoSupplier;
            })
        this.suppliersServices.selectProductSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(selectProduct=>{
                this.purchaseDataArray = null;
                this.selectedProduct = selectProduct;
                this.getPurchases()

            })
    }

    toggleCardSupplier(){
        this.showCardSupplier = !this.showCardSupplier;
    }

    getPurchases(){
        console.log(this.selectedProduct)
        this.productServices.getPurchases(this.selectedProduct).subscribe(
            response => {
                this.purchaseDataArray = response.data;
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
