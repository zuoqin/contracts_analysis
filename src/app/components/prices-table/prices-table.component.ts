import { Component } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { ProductServices } from '@core';
import { CONFIG } from '@config';

/*Models*/
import { ProductSearch } from '@core';
@Component({
    selector:"prices-table",
    templateUrl:"./prices-table.component.html"
})
export class PriceTableComponent{
    selectedProduct:ProductSearch;
    pricesDynamics;
    currentDate = {};
    averagePrice = {
        year:{
            market:null,
            purchase:null
        },
        all:{
            market:null,
            purchase:null
        },
        count:Math.floor(Math.random() * 3000) + 1000 
    }
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    constructor(

        private productServices:ProductServices
        ){
          

            let date = new Date()
            this.currentDate["month"] = date.getMonth();
            this.currentDate["monthText"] = CONFIG.months[date.getMonth()];
            this.currentDate["year"] = date.getFullYear()

            this.productServices.SelectProductObservable
                .subscribe((selectedProduct)=>{
                    this.selectedProduct = selectedProduct;
                    // this.productServices.getPriceDynamics(this.selectedProduct).subscribe(
                    //     response => {
                    //         this.getAveragePrice(response)
                    //         this.setPriceDifference(response);
                           

                         
                    //     },
                    //     err => {
                    //         console.log(err)
                    //     }
                    // );
  
                })

        }
    getAveragePrice(data){
        let yearSumm = 0;
        let yearSummCount = 0;
        let summ = 0;
        
        data.map(item=>{
            summ += item.avg_purchase_price;
            if(item.year == this.currentDate["year"]){
                yearSummCount++;
                yearSumm += item.avg_purchase_price;
               
            }
          
        })
        if(yearSummCount){
            this.averagePrice.year.market = yearSumm/yearSummCount;
            this.averagePrice.year.purchase = yearSumm/yearSummCount;
        }
        this.averagePrice.all.market = summ/data.length;
        this.averagePrice.all.purchase = summ/data.length;
    
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
            // item.avg_purchase_price = item.avg_purchase_price+20000;
            if(data[index+1]){

                item['diffMarket'] = data[index].market - data[index+1].market;
                item['diffPurchase'] = data[index].purchase - data[index+1].purchase

                // item['diffMarket'] = (data[index].avg_purchase_price - data[index+1].avg_purchase_price).toFixed(2);
                // item['diffPurchase'] = (data[index].avg_purchase_price - data[index+1].avg_purchase_price).toFixed(2)
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