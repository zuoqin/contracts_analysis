import { Component,ViewChild } from '@angular/core';

@Component({
    selector:"food-prices",
    templateUrl:"./food-prices.component.html"
})
export class FoodPricesComponent{
    loadData:boolean = true;
    showCardSupplier:boolean = true;
    @ViewChild('sentCPModal') sentCPModal;
    onLoadData(){
        this.loadData = true;
    }
    toggleCardSupplier(){
        this.showCardSupplier = !this.showCardSupplier;
    }
    showSendingCPModal(){
        this.sentCPModal.open()
    }
}
