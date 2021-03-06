import { Component,Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductServices,SuppliersServices } from '@core';
import { CONFIG } from '@config';

/*Models*/
import { ProductSearch } from '@core';
@Component({
    selector:"prices-table",
    templateUrl:"./prices-table.component.html"
})
export class PriceTableComponent implements OnInit{
    predictionPriceArray;
    @Input('priceArray') priceArray;
    @Input('isSupplierPage') isSupplierPage;
    @Input()
        set predictionPrice(predictionPrice: string) {
            this.predictionPriceArray = predictionPrice;
        }

    unsubscribeAll = new Subject();
    selectedProduct:ProductSearch;
    pricesDynamics;
    currentDate = {};
    suppliersCount;
    
    averagePrice = {
        year:{
            market:null,
            purchase:null
        },
        all:{
            market:null,
            purchase:null
        }
    }

    constructor(
        private suppliersServices:SuppliersServices,
        private productServices:ProductServices
        ){
            let date = new Date()
            this.currentDate["month"] = date.getMonth();
            this.currentDate["monthText"] = CONFIG.months[date.getMonth()];
            this.currentDate["year"] = date.getFullYear()

            

            this.suppliersServices.suppliersCountObservable
                .pipe(takeUntil(this.unsubscribeAll))
                .subscribe(count=>{
                    this.suppliersCount = count
                })
      

    }
    ngOnInit(){
      
        if(this.priceArray){
            this.cutPrice()
            this.getAveragePrice(this.priceArray)
            this.setPriceDifference(this.priceArray);
        }
   
    }
    cutPrice(){
        this.priceArray.map((item)=>{
        
            if(item.market){
                item.market = parseFloat(item.market.toFixed(2) )
            }
            if(item.purchase){
                item.purchase = parseFloat(item.purchase.toFixed(2) )
            }
        })
    }
    getAveragePrice(data){
        let yearSummMarket = 0;
        let yearSummPurchase = 0;
        let yearSummCount = 0;
        let summAllMarket = 0;
        let summAllPurchase = 0;
        data.map(item=>{

            summAllMarket += item.market;
            summAllPurchase += item.purchase;
            if(item.year == this.currentDate["year"]){
                yearSummCount++;
                yearSummMarket += item.market;
                yearSummPurchase += item.purchase;
               
            }
          
        })
        if(yearSummCount){
            this.averagePrice.year.market = (yearSummMarket/yearSummCount).toFixed(2);
            this.averagePrice.year.purchase = (yearSummPurchase/yearSummCount).toFixed(2);
        }
        this.averagePrice.all.market = (summAllMarket/data.length).toFixed(2);
        this.averagePrice.all.purchase = (summAllPurchase/data.length).toFixed(2);
    
    }
    setMonthPricesDynamics(data){
        let priceArrayTemp = [];
        data.map(item=>{
            let date = new Date(item.date);
            let year = date.getFullYear().toString();
   
            item["monthText"] = CONFIG.months[date.getMonth()];
            item["month"] = date.getMonth();
            item["year"] = date.getFullYear();

     
         
            if(priceArrayTemp.filter(item2=>item2.year==year).length){
                    let index;
                    priceArrayTemp.map((item3,i)=>{
                        if(item3.year==year){
                            index = i;
                        }
                    })
                    priceArrayTemp[index].data.push(item)
            }  else{
        
                let newarray = {};
           
               
                newarray["active"] = false;
            
                newarray["year"] = year;
           
                newarray["data"] =  []
                newarray["data"].push(item)
                priceArrayTemp.push(newarray)
            }
        })
   
        this.pricesDynamics = priceArrayTemp;

    }
    setPriceDifference(data){
     
        data.map(item=>[
            item['date'] = Date.UTC(item.year, item.month-1, 1),
        ])
        data = data.sort(this.dynamicSort("-date"))

        data.map((item,index)=>{

            if(data[index+1]){
                item['diffMarket'] = (data[index].market - data[index+1].market).toFixed(2);
                item['diffPurchase'] = (data[index].purchase - data[index+1].purchase).toFixed(2);
            }else{
                item['diffMarket'] = 0;
                item['diffPurchase'] = 0;
            }
        })


     
        
        this.setMonthPricesDynamics(data)
    }


    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
    toggleYearsPrice(value){
        value.active =!value.active;

       
    }
}