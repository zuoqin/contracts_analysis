import { Component } from '@angular/core';

@Component({
    selector:"search-suppliers",
    templateUrl:"./search-suppliers.component.html"
})
export class SearchSuppliersComponent{
    loadData:boolean = true;
    showCardSupplier:boolean = false;
    onLoadData(){
        this.loadData = true;
    }
    toggleCardSupplier(){
        this.showCardSupplier = !this.showCardSupplier;
    }
    


}
