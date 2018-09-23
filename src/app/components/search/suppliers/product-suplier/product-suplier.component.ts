import { Component,ViewEncapsulation, OnInit, Input } from '@angular/core';

import { ProductServices } from '@core';



@Component({
    selector:"product-suplier",
    templateUrl:"./product-suplier.component.html",
    styleUrls: ['./product-suplier.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductSuplierComponent implements OnInit{
    @Input('currentProduct') currentProduct;
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
        console.log(this.currentProduct)
    }
    onChangedChartLegend(data){
        setTimeout(()=>{
            this.priceProductCharts = data;
        })

    }
}