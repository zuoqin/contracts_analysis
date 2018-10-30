import { Component,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/*Services*/
import { SuppliersServices } from '@core';
@Component({
    selector:"product-prices",
    templateUrl:"./product-prices.component.html"
})
export class ProductPricesComponent{
    unsubscribeAll = new Subject();
    @ViewChild('textModal') textModal;
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
  
    getPriceSupplier(){
        this.suppliersServices.getPriceSupplier(this.selectedSupplier.supplier_id).subscribe(
            response => {
                this.productsArray = response.data;

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
    showAnswer(text,){
        this.textModal.open(text,'Просмотр ответа')
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
