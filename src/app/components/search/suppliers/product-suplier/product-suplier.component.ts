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

    priceChartsData;
    legendData;
    selectedSupplier;
    selectedProduct;
    priceDynamicsArray;
    constructor(
        private productServices:ProductServices,
        private suppliersServices:SuppliersServices
    ){
        this.suppliersServices.SelectSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedSupplier)=>{
                this.priceDynamicsArray = null;
                this.selectedSupplier = selectedSupplier;
                this.legendData = null;
                this.priceChartsData = null;
                this.selectedProduct = null;
            })
        this.suppliersServices.selectProductSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(selectProduct=>{

                this.legendData = null;
                this.priceChartsData = null;
                this.priceDynamicsArray = null;
                this.selectedProduct = selectProduct;
                this.getProductPriceSupplier();
                
                // this.productServices.getPriceDynamics(this.selectedProduct).subscribe(
                //     response => {
                //         console.log(response)
                //     },
                //     err => {
                //         console.log(err)
                //     }
                // );

            })




        // setTimeout(()=>{
    
        //     this.legendData=this.productServices.priceProductChartsData;
        //     console.log(this.legendData)
        // })
   
    }
    ngOnInit(){
      
    }
    getProductPriceSupplier(){

        
        this.suppliersServices.getProductPriceSupplier(this.selectedSupplier.supplier_id,this.selectedProduct.spgz_id,this.selectedProduct.unit.unit_id).subscribe(
            response => {
  
                this.priceDynamicsArray = response;
        
                let priceProductCharts = [];
                priceProductCharts.push(
                    {
                        id: "marketPrice",
                        name: "Рыночная цена",
                        type: "left",
                        value: true,
                        color: "#EB2424",
                        data: this.getDataArrayCharts(response,true)
                    }
                )
                priceProductCharts.push(
                    {
                        id: "priceSupplier",
                        name: "Цена поставщика",
                        type: "right",
                        value: true,
                        color: "#298832",
                        data: this.getDataArrayCharts(response,false)
                    }
                )
                this.legendData = priceProductCharts;
                this.priceChartsData = priceProductCharts;
            },
            err => {
    
                console.log(err)
            }
        );
    }
    getDataArrayCharts(arrayData,isMarket){
        let array = [];
        arrayData.map(item=>{
            let data;
            if(isMarket){
                data = item.market;
            }else{
                data = item.purchase;
            }
            if(this.isFloat(data)){
                data = parseFloat(data.toFixed(2))
            }
            array.push([Date.UTC(item.year, item.month-1, 1), data])
        })
        return array;
    }
    isFloat(x) { return !!(x % 1); }

    onChangedChartLegend(data){
        this.priceChartsData = data.slice();
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}