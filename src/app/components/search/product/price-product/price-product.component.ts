
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductServices } from '@core';
/*Models*/
import { ProductSearch } from '@core';

import { CONFIG } from '@config';
@Component({
    selector:"price-product",
    templateUrl:"./price-product.component.html"
})

export class PriceProductComponent  implements OnInit{
    selectedProduct:ProductSearch;
    priceChartsData;
    legendData;
    unsubscribeAll = new Subject();
    priceDynamicsArray;
    predictionPrice;
    constructor(
        private productServices:ProductServices
    ){
        this.productServices.SelectProductObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedProduct)=>{
                this.priceChartsData=null;
                this.selectedProduct = selectedProduct;
                this.getChartsData();

                this.productServices.getPriceDynamics(this.selectedProduct).subscribe(
                    response => {
                        this.priceDynamicsArray = response.data;
                    },
                    err => {
                        console.log(err)
                    }
                );

                
                this.productServices.getPredictionPrice(this.selectedProduct).subscribe(
                    response => {
                        this.predictionPrice
                        if(response.data.length){
                            response.data["monthText"] = CONFIG.months[response.data.month-1]
                            response.data["currency"] = this.declOfNum(parseInt(response.data.price), ['рубль', 'рубля', 'рублей']);
                            this.predictionPrice = response.data;
                        }else{
                            this.predictionPrice = null
                        }
                   
                    },
                    err => {
                        console.log(err)
                    }
                );


            })
    }
    ngOnInit(){

    }
    declOfNum(number, titles) {  
        let cases = [2, 0, 1, 1, 1, 2];  
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
    }
    getChartsData(){
        this.productServices.getChartsData(this.selectedProduct)
            .subscribe(
                response => {

                    let priceProductCharts = [];
                    
                    priceProductCharts.push(
                        {
                            name: 'Рынок в Москве',
                            id:"marketMoscow",
                            color: '#EB2424',
                            lineWidth: 4.5,
                            type:"left",
                            value:true,
                            marker: {
                                symbol: 'circle',
                                lineWidth: 0,
                                radius: 4
                            },
                            data: this.getDataArrayCharts(response.filter(item=>item.is_msk&&item.is_municipal==undefined&&item.is_federal==undefined),true)
                            
                        },
                    )
                    priceProductCharts.push(
                        {
                            name: 'Закупки в Москве',
                            color:'#F50671',
                            type:"left",
                            id:"purchasesMoscow",
                            value:false,
                            data: this.getDataArrayCharts(response.filter(item=>item.is_msk&&item.is_municipal==undefined&&item.is_federal==undefined),false)
                        },
                    )
                    priceProductCharts.push(
                        {
                            name: 'Рынок ЦФО',
                            color:'aqua',
                            type:"left",
                            id:"marketCFO",
                            value:false,
                            data: this.getDataArrayCharts(response.filter(item=>item.is_cfo),true)
                        },
                    )
                    priceProductCharts.push(
                        {
                            name: 'Закупки ЦФО',
                            color:'blueviolet',
                            type:"left",
                            id:"purchasesCFO",
                            value:false,
                            data: this.getDataArrayCharts(response.filter(item=>item.is_cfo),false)
                        },
                    )
                    priceProductCharts.push(
                        {
                            name: 'Рынок вне ЦФО',
                            color:'orange',
                            type:"left",
                            id:"marketOutCFO",
                            value:false,
                            data: this.getDataArrayCharts(response.filter(item=>item.is_cfo==false),true)
                        },
                    )
                    priceProductCharts.push(
                        {
                            name: 'Закупки вне ЦФО',
                            color:'chocolate',
                            type:"left",
                            id:"purchasesOutCFO",
                            value:false,
                            data:  this.getDataArrayCharts(response.filter(item=>item.is_cfo==false),false)
                        },
                    )

                    priceProductCharts.push(
                        {
                            name: 'Рынок выбранной территории',
                            id:"marketSelect",
                            color:'#298832',
                            type:"right",
                            lineWidth: 4.5,
                            value:true,
                            marker: {
                                symbol: 'circle',
                                lineWidth: 0,
                                radius: 4
                            },
                            data: this.getDataArrayCharts(response.filter(item=>item.is_federal==undefined&&item.is_cfo==undefined&&item.is_msk==undefined&&item.is_municipal==undefined),true)
                        },
                    )
                    priceProductCharts.push(
                        {
                            name: 'Закупки выбранной территории',
                            color:'#3B42CE',
                            type:"right",
                            id:"purchasesSelect",
                            value:false,
                            data: this.getDataArrayCharts(response.filter(item=>item.is_federal==undefined&&item.is_cfo==undefined&&item.is_msk==undefined&&item.is_municipal==undefined),false)
                        },
                    )

                    priceProductCharts.push(
                        {
                            name: 'Федералы в Москве',
                            color:'cornflowerblue',
                            type:"right",
                            id:"federalsMoscow",
                            value:false,
                            data: this.getDataArrayCharts(response.filter(item=>item.is_federal==true&&item.is_msk==true),false)
                        },
                    )
                    priceProductCharts.push(
                        {
                            name: 'Федералы вне Москвы',
                            color:'orchid',
                            type:"right",
                            id:"federalsOutMoscow",
                            value:false,
                            data: this.getDataArrayCharts(response.filter(item=>item.is_federal==true&&item.is_msk==false),false)
                        },
                    )
                    priceProductCharts.push(
                        {
                            name: 'Муниципалы в Москве',
                            color:'#b8b838',
                            type:"right",
                            id:"municipalsMoscow",
                            value:false,
                            data: this.getDataArrayCharts(response.filter(item=>item.is_municipal==true&&item.is_msk==true),false)
                        },
                    )
                    priceProductCharts.push(
                        {
                            name: 'Муниципалы вне Москвы',
                            color:'palegreen',
                            type:"right",
                            id:"municipalsOutMoscow",
                            value:false,
                            data: this.getDataArrayCharts(response.filter(item=>item.is_municipal==true&&item.is_msk==false),false)
                        },
                    )
                    this.legendData = priceProductCharts;
                    this.priceChartsData = priceProductCharts;
                    
                },
                err => {
                    console.log(err)
                }
            );
    }


    onChangedChartLegend(data){
        this.priceChartsData = data.slice();
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
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}

