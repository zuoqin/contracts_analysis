import { Component,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/*Services*/
import { SuppliersServices } from '@core';
@Component({
    selector:"food-prices",
    templateUrl:"./food-prices.component.html"
})
export class FoodPricesComponent{
    unsubscribeAll = new Subject();
    loadData:boolean = true;
    showCardSupplier:boolean = true;
    selectedSupplier;
    productsArray;
    constructor(
        private suppliersServices:SuppliersServices
    ){
        this.suppliersServices.SelectSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedSupplier)=>{
                this.selectedSupplier = selectedSupplier;
     
                this.getPriceSupplier()
            })
    }
    @ViewChild('sentCPModal') sentCPModal;
    getPriceSupplier(){
        this.suppliersServices.getPriceSupplier(this.selectedSupplier.supplier_id).subscribe(
            response => {
                this.productsArray = response.data;
                console.log(response.data)

            },
            err => {

                console.log(err)
            }
        );
    }
 


    onLoadData(){
        this.loadData = true;
    }
    toggleCardSupplier(){
        this.showCardSupplier = !this.showCardSupplier;
    }
    showSendingCPModal(){
        this.sentCPModal.open()
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
