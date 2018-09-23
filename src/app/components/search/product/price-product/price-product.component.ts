
import { Component, OnInit } from '@angular/core';

import { ProductServices } from '@core';

@Component({
    selector:"price-product",
    templateUrl:"./price-product.component.html"
})

export class PriceProductComponent  implements OnInit{

    priceChartsData;
    legendData;
    constructor(
        private productServices:ProductServices
    ){
        setTimeout(()=>{
            this.legendData=this.productServices.priceChartsData;
        })
   
    }
    ngOnInit(){

    }
    onChangedChartLegend(data){
        setTimeout(()=>{
            this.priceChartsData = data;
        })
    }

}
