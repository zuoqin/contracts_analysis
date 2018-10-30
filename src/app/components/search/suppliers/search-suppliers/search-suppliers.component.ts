import { Component,OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/*Services*/
import { SuppliersServices, ProductServices } from '@core';

@Component({
    selector:"search-suppliers",
    templateUrl:"./search-suppliers.component.html"
})
export class SearchSuppliersComponent{
    unsubscribeAll = new Subject();
    showCardSupplier:boolean = false;

    selectedSupplier;
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
                this.purchaseDataArray = null;
                this.infoSupplier = null;
                this.selectedSupplier=selectedSupplier;
            })

        this.suppliersServices.SupplierInfoObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(infoSupplier=>{
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
