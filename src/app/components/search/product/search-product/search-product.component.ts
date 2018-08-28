import { Component } from '@angular/core';

@Component({
    selector:"search",
    templateUrl:"./search-product.component.html"
})
export class SearchProductComponent{
    loadData:boolean = false;
    onLoadData(){
        this.loadData = true;
    }

    


}
