import { Component } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { ProductServices } from '@core';
import { CONFIG } from '@config';


@Component({
    selector:"prices-table",
    templateUrl:"./prices-table.component.html"
})
export class PriceTableComponent{
    pricesDynamics;
    currentDate = {};
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    constructor(

        private productServices:ProductServices
        ){
          

            let date = new Date()
            this.currentDate["month"] = date.getMonth();
            this.currentDate["monthText"] = CONFIG.months[date.getMonth()];
            this.currentDate["year"] = date.getFullYear()

            this.productServices.changePricesDynamicsObservable
                .takeUntil(this.ngUnsubscribe)
                .subscribe((data)=>{
                    this.setPriceDifference(data)
                })
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
                console.log(2)
                let newarray = {};
           
               
                newarray["active"] = false;
            
                newarray["year"] = year;
           
                newarray["data"] =  []
                newarray["data"].push(item)
                priceArrayTemp.push(newarray)
            }
        })
        this.pricesDynamics = priceArrayTemp;
        console.log(this.pricesDynamics)

    }
    setPriceDifference(data){
        data.map((item,index)=>{
            if(data[index+1]){
                item['diffMarket'] = data[index].market - data[index+1].market;
                item['diffPurchase'] = data[index].purchase - data[index+1].purchase
            }else{
                item['diffMarket'] = 0;
                item['diffPurchase'] = 0;
            }
        })
        this.setMonthPricesDynamics(data)
    }
    ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
    }
    toggleYearsPrice(value){
        value.active =!value.active;
        if(value.year!=this.currentDate["year"]){
           
        }else{
            console.log(value)
        }
       
    }
}