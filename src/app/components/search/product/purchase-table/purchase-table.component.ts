
import { OnInit,ViewChild } from '@angular/core';
import { Component } from '@angular/core';


/*Services */
import { ProductServices } from '@core';
/*Models*/
import { ProductSearch } from '@core';

import { CONFIG } from '@config';
@Component({
    selector:"purchase-table",
    templateUrl:"./purchase-table.component.html"
})
export class PurchaseTableComponent{
    @ViewChild('selectedRangeDate') selectedRangeDate;
    tooltipOptions;
    selectedProduct:ProductSearch;
    ifLoadData:boolean = false;
    messageResponse = CONFIG.messageResponse;
    constructor(
        private productServices:ProductServices
    ){
        this.tooltipOptions = CONFIG.tooltipOptions;
        this.productServices.SelectProductObservable
            .subscribe((selectedProduct)=>{
        
                this.selectedProduct = selectedProduct;
                this.getPurchases()
            })
    }
    filterArray = {
        date:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        },
        name:{
            filterValue:null,
            filter:false
        },
        dateEnd:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        },
        contract_value:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        },
        unitprice:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        },
        days:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        },
        contract_price:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        },
        contract_status:{
            value:[],
            filterValue:[],
            filter:false
        }
        
    }


    purchaseColumns=[
        {
            id:"date",
            text:"Дата заключения контракта",
            active:true
        },
        {
            id:"name",
            text:"Заказчик",
            active:true
        },
        {
            id:"contract_value",
            text:"Объем",
            active:true
        },
        {
            id:"unitprice",
            text:"Цена, руб.",
            active:true
        },
        {
            id:"days",
            text:"Срок исполнения",
            active:true
        },
        {
            id:"contract_price",
            text:"Цена контракта",
            active:true
        },
        {
            id:"contract_status",
            text:"Статус контракта",
            active:true
        },
        {
            id:"dateEnd",
            text:"Дата окончания контракта",
            active:true
        },
        {
            id:"complaint",
            text:"Наличие жалоб",
            active:true
        },
    ]
        
    initalData;
    purchaseData;
    getPurchases(){

        this.productServices.getPurchases(this.selectedProduct).subscribe(
            response => {
                if(response.data.length){
                    this.formatData(response.data)
                }else{
                    this.messageResponse.text =  this.messageResponse.noData;
                }
              
 
                this.ifLoadData = true;

            },
            err => {
                this.messageResponse.text =  this.messageResponse.error;
                this.ifLoadData = true;
                console.log(err)
            }
        );
    }
    formatData(data){
        data.map(item=>{

            let dateCurrent = item.contract_sign_date.split('/');
            let dateNew = new Date(dateCurrent[2],dateCurrent[1]-1,dateCurrent[0]);
            item['date'] = {
                value:dateNew,
                text:dateCurrent.join(".")
            };


            dateCurrent = item.contract_end_date.split('/');
            dateNew = new Date(dateCurrent[2],dateCurrent[1]-1,dateCurrent[0]);
            item['dateEnd'] = {
                value:dateNew,
                text:dateCurrent.join(".")
            };
            item['price'] = 9231;
            item['complaint'] = false;
            item['safety'] = true;

        
        })

        this.filterArray.date.min = this.findMinMaxDate(data,'date','min');
        this.filterArray.date.max = this.findMinMaxDate(data,'date','max');


        this.filterArray.dateEnd.min = this.findMinMaxDate(data,'dateEnd','min');
        this.filterArray.dateEnd.max = this.findMinMaxDate(data,'dateEnd','max');


        this.filterArray.contract_value.min = this.findMinMax(data,'contract_value','min');
        this.filterArray.contract_value.max = this.findMinMax(data,'contract_value','max');

        this.filterArray.unitprice.min = this.findMinMax(data,'unitprice','min');
        this.filterArray.unitprice.max = this.findMinMax(data,'unitprice','max');

        this.filterArray.days.min = this.findMinMax(data,'days','min');
        this.filterArray.days.max = this.findMinMax(data,'days','max');

        this.filterArray.contract_price.min = this.findMinMax(data,'contract_price','min');
        this.filterArray.contract_price.max = this.findMinMax(data,'contract_price','max');


        this.filterArray.contract_status.value = this.findAllDiffValue(data,'contract_status');
        
        
    
        this.initalData = data;
        this.purchaseData = data;

        this.ifLoadData = true;
    }
    findAllDiffValue(data,field){
        let array=[];
        let arrayDiff=[];
        data.map(item=>{
            Object.keys(item).forEach(function (key) {
                if(key==field){
                    array.push(item[key])
                }
             });
        })
        array.map(item=>{
            if(arrayDiff.indexOf(item)<0){
                arrayDiff.push(item)
            }
        })
   
        return arrayDiff;
    
    }
    findMinMax(data,field,type){
        let array=[];
        data.map(item=>{
            Object.keys(item).forEach(function (key) {
                if(key==field){
                    array.push(item[key])
                }
             });
        })
  
        if(type=="min"){
            return  Math.min.apply(null, array);
        }else{
            return Math.max.apply(null, array);
        }
    }
    findMinMaxDate(data,field,type){
        let dates=[];
        data.map(item=>{
            Object.keys(item).forEach(function (key) {
                if(key==field){
                    dates.push(item[key].value)
                }
             });
        })
        if(type=="min"){
            return new Date(Math.min.apply(null,dates));
        }else{
            return new Date(Math.max.apply(null,dates));
        } 
    }

    onSelectValueFilter(value,field){
  
        if(value.length){
            this.filterArray[field].filterValue = value;
            this.filterArray[field].filter = true;
        }else{
            this.filterArray[field].filter = false;
        }
        this.filterData()
    }
    onSelectedDateRange(value){
        if(value){
            this.filterArray.date.filterMin = new Date(value.beginDate.year, value.beginDate.month-1, value.beginDate.day)
            this.filterArray.date.filterMax =  new Date(value.endDate.year, value.endDate.month-1, value.endDate.day)
            this.filterArray.date.filter = true;
        }else{
            this.filterArray.date.filter = false;
        }
        this.filterData()
    }
    onEnterNameFilter(value){
        if(value){
            this.filterArray.name.filterValue = value;
            this.filterArray.name.filter = true;
        }else{
            this.filterArray.name.filter = false;
        }
        this.filterData()
    }

    onEnterInputRangeFilter(value,field){
        if(value){
            this.filterArray[field].filterMax = value.to;
            this.filterArray[field].filterMin = value.from;
            this.filterArray[field].filter = true;
        }else{
            this.filterArray[field].filter = false;
        }
        this.filterData()
    }
    onSelectedDateEndRange(value){
        if(value){
            this.filterArray.dateEnd.filterMin = new Date(value.beginDate.year, value.beginDate.month-1, value.beginDate.day)
            this.filterArray.dateEnd.filterMax =  new Date(value.endDate.year, value.endDate.month-1, value.endDate.day)
            this.filterArray.dateEnd.filter = true;
        }else{
            this.filterArray.dateEnd.filter = false;
        }
        this.filterData()
    }


    filterData(){
        let array = [];
        let filtered:boolean = false;
        array = this.initalData;

        if(this.filterArray.date.filter){
            filtered = true;
            array = array.filter(item=>item.date.value>=this.filterArray.date.filterMin && item.date.value<=this.filterArray.date.filterMax);
        }
        if(this.filterArray.dateEnd.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.dateEnd.value>=this.filterArray.dateEnd.filterMin && item.dateEnd.value<=this.filterArray.dateEnd.filterMax)
        }
        if(this.filterArray.name.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.name.toLowerCase().indexOf(this.filterArray.name.filterValue)>=0)
        }

        if(this.filterArray.contract_value.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.contract_value>=this.filterArray.contract_value.filterMin && item.contract_value<=this.filterArray.contract_value.filterMax)
        }

        if(this.filterArray.unitprice.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.unitprice>=this.filterArray.unitprice.filterMin && item.unitprice<=this.filterArray.unitprice.filterMax)
        }
        if(this.filterArray.days.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.days>=this.filterArray.days.filterMin && item.days<=this.filterArray.days.filterMax)
        }

        if(this.filterArray.contract_price.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.contract_price>=this.filterArray.contract_price.filterMin && item.contract_price<=this.filterArray.contract_price.filterMax)
        }
        
        if(this.filterArray.contract_status.filter && array.length){
            filtered = true;

            array = array.filter(item=>this.filterArray.contract_status.filterValue.indexOf(item.contract_status)>=0 )
        }


        
        
        if(filtered){
            this.purchaseData = array;
        }else{
            this.purchaseData = this.initalData;
        }


       
    }
    

    isColumnActive(columnId){
    
        return this.purchaseColumns.filter(item=>item.id==columnId)[0].active
    }
    onSelectedColumns(value){
        this.purchaseColumns = value;
    }
   

}
