import { Component,ViewEncapsulation, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductServices } from '@core';
/*Srvices */
import { SuppliersServices } from '@core';


@Component({
    selector:"product-suplier",
    templateUrl:"./product-suplier.component.html",
    styleUrls: ['./product-suplier.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductSuplierComponent implements OnInit{
    unsubscribeAll = new Subject();

    priceProductCharts;
    legendData;
    selectedSupplier;
    selectedProduct;
    constructor(
        private productServices:ProductServices,
        private suppliersServices:SuppliersServices
    ){
        this.suppliersServices.SelectSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedSupplier)=>{
                this.selectedSupplier = selectedSupplier;
            })
        this.suppliersServices.selectProductSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(selectProduct=>{
                this.selectedProduct = selectProduct;
                this.getProductPriceSupplier()

            })




        setTimeout(()=>{
            this.legendData=this.productServices.priceProductChartsData;
        })
   
    }
    ngOnInit(){
      
    }
    getProductPriceSupplier(){
        // this.suppliersServices.getProductPriceSupplier(this.selectedSupplier.supplier_id).subscribe(
        //     response => {
        //         this.productsArray = response.data;
        //         console.log(response.data)
    
        //     },
        //     err => {
    
        //         console.log(err)
        //     }
        // );
    }

  

    onChangedChartLegend(data){
        setTimeout(()=>{
            this.priceProductCharts = data;
        })

    }
}