
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { CONFIG } from '@config';

/*Services */
import { ProductServices } from '@services/product.services';


@Component({
    selector:"price-product",
    templateUrl:"./price-product.component.html"
})




export class PriceProductComponent  implements OnInit{
    priceChartsData;
    pricesDynamics;
    priceChartLegendForm: FormGroup;
    currentDate = {};
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    constructor(
        private formBuilder: FormBuilder,
        private productServices:ProductServices
        ){
            this.priceChartsData=this.productServices.priceData;

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
   
  
    ngOnInit(){
        this.initForm();
    }
    ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
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
    toggleYearsPrice(value){
        value.active =!value.active;
        if(value.year!=this.currentDate["year"]){
           
        }else{
            console.log(value)
        }
       
    }
    initForm(){
        this.priceChartLegendForm = this.formBuilder.group({
            marketMoscow: [true],
            purchasesMoscow: [false],
            marketCFO: [false],
            purchasesCFO: [false],
            marketOutCFO: [false],
            purchasesOutCFO: [false],
            marketSelect: [true],
            purchasesSelect: [false],
            federalsMoscow: [false],
            federalsOutMoscow: [false],
            municipalsMoscow: [false],
            municipalsOutMoscow: [false],
        });
        this.onChangeLegend()


    }
    onChangeLegend(){
        let activeGraphs = [];
        for(let control in this.priceChartLegendForm.controls) {
            let id = control;
            let value = this.priceChartLegendForm.controls[control].value;

            if(value){
                activeGraphs.push(id)
               
            }
        }
        this.selectActiveGraph(activeGraphs)
     
    }
    selectActiveGraph(activeGraphs){
        let activeGraphDataArray = [];

        activeGraphs.map(graph=>{
            activeGraphDataArray.push(this.priceChartsData.filter(data=>data.id==graph)[0])
        })

        this.productServices.changeGraphData.next(activeGraphDataArray)
    }
}
