import { Component,ViewChild,Input,OnInit } from '@angular/core';
/*Services*/
import { SuppliersServices,ProductServices,FilterServices } from '@core';
/*Models*/
import { ProductSearch } from '@core';

import { environment } from '@environments';
import { CONFIG } from '@config';

@Component({
    selector:"suppliers-table",
    templateUrl:"./suppliers-table.component.html"
})
export class SuppliersTableComponent implements OnInit{
    selectedProduct:ProductSearch;
    initalData;
    suppliersData;
    ifLoadData:boolean = false;
    @Input('noShowSupplier') noShowSupplier;
    
    messageResponse = CONFIG.messageResponse;
    @ViewChild('addCommercialProposalModal') addCommercialProposalModal;
    @ViewChild('addSupplierModal') addSupplierModal;
    @ViewChild('sentCPModal') sentCPModal;
    @ViewChild('sendingCPModal') sendingCPModal;
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
        volume:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        },
        price_per_unit:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        },
        delivery:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        },
        volume_count:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        }, 
    }
    dataColumns=[
        {
            id:"date",
            text:"Дата получения цены",
            active:true
        },
        {
            id:"name",
            text:"Поставщик",
            active:true
        },
        {
            id:"volume",
            text:"Объем",
            active:true
        },
        {
            id:"price_per_unit",
            text:"Цена, руб.",
            active:true
        },
        {
            id:"delivery",
            text:"Срок поставки",
            active:true
        },
        {
            id:"volume_count",
            text:"Участий в закупках",
            active:true
        },
        {
            id:"comm_offer",
            text:"КП",
            active:true
        },
        {
            id:"calls",
            text:"Звонки",
            active:true
        },
    ]
    constructor(
        private suppliersServices:SuppliersServices,
        private productServices:ProductServices,
        private filterServices:FilterServices
    ){
        this.productServices.SelectProductObservable
            .subscribe((selectedProduct:ProductSearch)=>{
          
                this.selectedProduct = selectedProduct;
              //  console.log(this.selectedProduct)
            })
    }
    ngOnInit(){

 

        this.suppliersServices.getSuppliersForProduct(this.selectedProduct).subscribe(
            response => {
                
                if(!response.data.length){
                    this.messageResponse.text =  this.messageResponse.noData;
                }else{
                    this.formatData(response.data)
                   
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
            if(item.date){
                let date = item.date.split('/');
                item.date = {
                    value: new Date(date[2], date[1]-1, date[0]),
                    text:`${date[0]}.${date[1]}.${date[2]}`,
                }
            }  
        })

         this.filterArray.date.min = this.filterServices.findMinMaxDate(data,'date','min');
         this.filterArray.date.max = this.filterServices.findMinMaxDate(data,'date','max');
        console.log(this.filterArray)
        this.initalData = data;
        this.suppliersData = data;
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


    filterData(){
        let array = [];
        let filtered:boolean = false;
        array = this.initalData;

        if(this.filterArray.date.filter){
            filtered = true;
            array = array.filter(item=>item.date.value>=this.filterArray.date.filterMin && item.date.value<=this.filterArray.date.filterMax);
        }
        // if(this.filterArray.dateEnd.filter && array.length){
        //     filtered = true;
        //     array = array.filter(item=>item.dateEnd.value>=this.filterArray.dateEnd.filterMin && item.dateEnd.value<=this.filterArray.dateEnd.filterMax)
        // }
        // if(this.filterArray.name.filter && array.length){
        //     filtered = true;
        //     array = array.filter(item=>item.name.toLowerCase().indexOf(this.filterArray.name.filterValue)>=0)
        // }

        // if(this.filterArray.contract_value.filter && array.length){
        //     filtered = true;
        //     array = array.filter(item=>item.contract_value>=this.filterArray.contract_value.filterMin && item.contract_value<=this.filterArray.contract_value.filterMax)
        // }

        // if(this.filterArray.unitprice.filter && array.length){
        //     filtered = true;
        //     array = array.filter(item=>item.unitprice>=this.filterArray.unitprice.filterMin && item.unitprice<=this.filterArray.unitprice.filterMax)
        // }
        // if(this.filterArray.days.filter && array.length){
        //     filtered = true;
        //     array = array.filter(item=>item.days>=this.filterArray.days.filterMin && item.days<=this.filterArray.days.filterMax)
        // }

        // if(this.filterArray.contract_price.filter && array.length){
        //     filtered = true;
        //     array = array.filter(item=>item.contract_price>=this.filterArray.contract_price.filterMin && item.contract_price<=this.filterArray.contract_price.filterMax)
        // }
        
        // if(this.filterArray.contract_status.filter && array.length){
        //     filtered = true;

        //     array = array.filter(item=>this.filterArray.contract_status.filterValue.indexOf(item.contract_status)>=0 )
        // }


        
        
        if(filtered){
            this.suppliersData = array;
        }else{
            this.suppliersData = this.initalData;
        }


       
    }

    isColumnActive(columnId){
        return this.dataColumns.filter(item=>item.id==columnId)[0].active
    }
    onSelectedColumns(value){
        this.dataColumns = value;
    }
    addCommercialProposal(){
        this.addCommercialProposalModal.open()
    }
    addSupplier(){
        this.addSupplierModal.open()
    }
    showSentCPModal(supplier_id){
        this.sentCPModal.open(supplier_id)
    }
    showSendingCPModal(supplier_id){
        this.sendingCPModal.open(supplier_id)
    }
    downloadfile(){
        var str = "";
        for (var key in this.selectedProduct) {
            if(this.selectedProduct[key] && key!="name" && key!="unit_text"){
                if(Array.isArray(this.selectedProduct[key])){
                    if(this.selectedProduct[key].length){
                        let string = `${key}=`;
                        string +=this.selectedProduct[key].join(',')
                        str +=string;
                        str += "&";
                    } 
                }else{
                    str += key + "=" + this.selectedProduct[key];
                    str += "&";
                }
            }
        }
        console.log(str)
        window.open(environment.apiUrl+'/export_suppliers?'+str, '_blank');
    }
    
}