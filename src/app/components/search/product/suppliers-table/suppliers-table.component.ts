import { Component,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class SuppliersTableComponent{
    unsubscribeAll = new Subject();
    selectedProduct:ProductSearch;
    initalData;
    suppliersData;
    ifLoadData:boolean = false;
    averagePrice;
    
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
        comm_offer:{
            active:true,
            filter:false
        },
        calls:{
            active:true,
            filter:false
        }

        
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
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedProduct:ProductSearch)=>{
                this.selectedProduct = selectedProduct;
                this.getData()
            })
    }
    getData(){
        this.initalData = null;
        this.suppliersData = null;
        this.suppliersServices.getSuppliersForProduct(this.selectedProduct).subscribe(
            response => {
                this.suppliersServices.suppliersCountSubject.next(response.data.length)
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
    getPriceInfo(){
       
    }
    formatData(data){
        let summ = 0;
        data.map(item=>{
            summ += item.price_per_unit;
        })
        this.averagePrice = summ/data.length;


        data.map(item=>{
            item['percentDiff'] = ((item.price_per_unit-this.averagePrice)/this.averagePrice)*100
            if(item.date){
                let date = item.date.split('/');
                item.date = {
                    value: new Date(date[2], date[1]-1, date[0]),
                    text:`${date[0]}.${date[1]}.${date[2]}`,
                }
            }  
        })

        if(this.selectedProduct.overprice == "true")
        {
           data = data.filter(item => item.percentDiff > 30);
        }
        this.filterArray.date.min = this.filterServices.findMinMaxDate(data,'date','min');
        this.filterArray.date.max = this.filterServices.findMinMaxDate(data,'date','max');
       
        this.filterArray.volume.min = this.filterServices.findMinMax(data,'volume','min');
        this.filterArray.volume.max = this.filterServices.findMinMax(data,'volume','max');


        this.filterArray.price_per_unit.min = this.filterServices.findMinMax(data,'price_per_unit','min');
        this.filterArray.price_per_unit.max = this.filterServices.findMinMax(data,'price_per_unit','max');

        this.filterArray.delivery.min = this.filterServices.findMinMax(data,'delivery','min');
        this.filterArray.delivery.max = this.filterServices.findMinMax(data,'delivery','max');

        this.filterArray.volume_count.min = this.filterServices.findMinMax(data,'volume_count','min');
        this.filterArray.volume_count.max = this.filterServices.findMinMax(data,'volume_count','max');

        
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
    
    onEnterNameFilter(value){
        if(value){
            this.filterArray.name.filterValue = value;
            this.filterArray.name.filter = true;
        }else{
            this.filterArray.name.filter = false;
        }
        this.filterData()
    }
    onSelectRadioFilter(value,field){
        this.filterArray[field].active = value;
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
        if(this.filterArray.name.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.name.toLowerCase().indexOf(this.filterArray.name.filterValue)>=0)
        }

        if(this.filterArray.volume.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.volume>=this.filterArray.volume.filterMin && item.volume<=this.filterArray.volume.filterMax)
        }
        if(this.filterArray.price_per_unit.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.price_per_unit>=this.filterArray.price_per_unit.filterMin && item.price_per_unit<=this.filterArray.price_per_unit.filterMax)
        }
        if(this.filterArray.delivery.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.delivery>=this.filterArray.delivery.filterMin && item.delivery<=this.filterArray.delivery.filterMax)
        }
        if(this.filterArray.volume_count.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.volume_count>=this.filterArray.volume_count.filterMin && item.volume_count<=this.filterArray.volume_count.filterMax)
        }
        if(this.filterArray.comm_offer.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.comm_offer==this.filterArray.comm_offer.active)
        }


        
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
    showSentCPModal(supplier_id, offer_line_id){
        this.sentCPModal.open(supplier_id, offer_line_id)
    }
    showSendingCPModal(supplier){
        this.sendingCPModal.open(supplier.offer_line_id,supplier.email)
    }
    clickSupplier(supplier){
        window.open(`/search/supplier?supplier_id=${supplier.supplier_id}&supplier_name=${supplier.name}`, "_blank");
    }
    downloadfile(){
        var str = "";
        for (var key in this.selectedProduct) {
            if(this.selectedProduct[key] && key!="name" && key!="unit_text"&& key!="kpgz_id"){
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
        str = str.substring(0, str.length - 1);
        console.log(environment.apiUrl+'/export_suppliers?'+str)
        window.open(environment.apiUrl+'/export_suppliers?'+str, '_blank');
    }
      
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
 
}
