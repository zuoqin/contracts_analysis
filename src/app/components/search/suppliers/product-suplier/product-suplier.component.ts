import { Component,ViewEncapsulation, OnInit } from '@angular/core';

import { ProductServices } from '@core';



@Component({
    selector:"product-suplier",
    templateUrl:"./product-suplier.component.html",
    styleUrls: ['./product-suplier.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductSuplierComponent implements OnInit{

    priceProductCharts;
    legendData;
    constructor(
        private productServices:ProductServices
    ){
        setTimeout(()=>{
            this.legendData=this.productServices.priceProductChartsData;
        })
   
    }
    ngOnInit(){

    }
    onChangedChartLegend(data){
        setTimeout(()=>{
            this.priceProductCharts = data;
        })

    }
}