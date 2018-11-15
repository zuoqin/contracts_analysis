import { Component,ViewChild,OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/*Services*/
import { SuppliersServices,ProductServices,FilterServices } from '@core';
/*Models*/

import { environment } from '@environments';
import { CONFIG } from '@config';

@Component({
    selector:"commercial-offers",
    templateUrl:"./commercial-offers.component.html"
})
export class CommercialOffersComponent{

    selectedSupplier;
    unsubscribeAll = new Subject();
    selectedProduct;
    initalData;
    commercialOffers;
    ifLoadData:boolean = false;
    noShowSupplier:boolean = true;
    infoSupplier;
    messageResponse = CONFIG.messageResponse;
    averagePrice;
    @ViewChild('addCommercialProposalModal') addCommercialProposalModal;
    @ViewChild('addSupplierModal') addSupplierModal;
    @ViewChild('sentCPModal') sentCPModal;
    @ViewChild('sendingCPModal') sendingCPModal;
    filterArray = {
        zakup_date:{
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
        participation:{
            min:null,
            max:null,
            filterMin:null,
            filterMax:null,
            filter:false
        }, 
        result:{
            active:true,
            filter:false
        },
        call_url:{
            active:true,
            filter:false
        },
        product_url:{
            active:false,
            filter:false
        }

        
    }

    dataColumns=[
        {
            id:"zakup_date",
            text:"Дата получения цены",
            active:true
        },
        {
            id:"contract_value",
            text:"Объем",
            active:true
        },
        {
            id:"unitprice",
            text:"Цена, руб",
            active:true
        },
        {
            id:"delivery_terms",
            text:"Срок поставки",
            active:true
        },
        {
            id:"participation",
            text:"Участий в закупках",
            active:true
        },
        {
            id:"result",
            text:"КП",
            active:true
        },
        {
            id:"call_url",
            text:"Звонки",
            active:true
        },
        {
            id:"product_url",
            text:"Источник цены",
            active:false
        },
    ]
    constructor(
        private suppliersServices:SuppliersServices,
        private productServices:ProductServices,
        private filterServices:FilterServices
    ){
        this.suppliersServices.SelectSupplierObservable
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((selectedSupplier)=>{
            this.initalData = null;
            this.selectedProduct = null;
            this.commercialOffers = null;
            this.selectedSupplier = selectedSupplier;
        })
        this.suppliersServices.SupplierInfoObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(infoSupplier=>{
                this.infoSupplier = infoSupplier;
            })
        this.suppliersServices.selectProductSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(selectProduct=>{
   
                this.selectedProduct = selectProduct;
                this.initalData = null;
                this.commercialOffers = null;
                this.getData()
            })
    }

    getData(){

        this.suppliersServices.getCommercialOffersSuppliers(this.selectedProduct.spgz_id,this.selectedProduct.unit.unit_id, this.selectedSupplier.supplier_id).subscribe(
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
        let summ = 0;
        data.map(item=>{
            summ += item.unitprice;
        })
        this.averagePrice = summ/data.length;

        data.map(item=>{
            item['percentDiff'] = ((item.unitprice-this.averagePrice)/this.averagePrice)*100
            if(item.zakup_date){
                let date = item.zakup_date.split('/');
                item.zakup_date = {
                    value: new Date(date[2], date[1]-1, date[0]),
                    text:`${date[0]}.${date[1]}.${date[2]}`,
                }
            }  
        })

        this.filterArray.zakup_date.min = this.filterServices.findMinMaxDate(data,'zakup_date','min');
        this.filterArray.zakup_date.max = this.filterServices.findMinMaxDate(data,'zakup_date','max');
       
        this.filterArray.contract_value.min = this.filterServices.findMinMax(data,'contract_value','min');
        this.filterArray.contract_value.max = this.filterServices.findMinMax(data,'contract_value','max');


        this.filterArray.unitprice.min = this.filterServices.findMinMax(data,'unitprice','min');
        this.filterArray.unitprice.max = this.filterServices.findMinMax(data,'unitprice','max');


        this.filterArray.participation.min = this.filterServices.findMinMax(data,'participation','min');
        this.filterArray.participation.max = this.filterServices.findMinMax(data,'participation','max');

      
        this.initalData = data;
        this.commercialOffers = data;
    }

    onSelectedDateRange(value){
        if(value){
            this.filterArray.zakup_date.filterMin = new Date(value.beginDate.year, value.beginDate.month-1, value.beginDate.day)
            this.filterArray.zakup_date.filterMax =  new Date(value.endDate.year, value.endDate.month-1, value.endDate.day)
            this.filterArray.zakup_date.filter = true;
        }else{
            this.filterArray.zakup_date.filter = false;
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
    

    onSelectRadioFilter(value,field){
        this.filterArray[field].active = value;
        this.filterData()
    }

    filterData(){
        let array = [];
        let filtered:boolean = false;
        array = this.initalData;

        if(this.filterArray.zakup_date.filter){
            filtered = true;
            array = array.filter(item=>item.zakup_date.value>=this.filterArray.zakup_date.filterMin && item.zakup_date.value<=this.filterArray.zakup_date.filterMax);
        }

        if(this.filterArray.contract_value.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.contract_value>=this.filterArray.contract_value.filterMin && item.contract_value<=this.filterArray.contract_value.filterMax)
        }
        if(this.filterArray.unitprice.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.unitprice>=this.filterArray.unitprice.filterMin && item.unitprice<=this.filterArray.unitprice.filterMax)
        }
        if(this.filterArray.participation.filter && array.length){
            filtered = true;
            array = array.filter(item=>item.participation>=this.filterArray.participation.filterMin && item.participation<=this.filterArray.participation.filterMax)
        }
  
        
        if(filtered){
            this.commercialOffers = array;
        }else{
            this.commercialOffers = this.initalData;
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
    showSentCPModal(supplier_id,supplier){
        this.sentCPModal.open(supplier_id,supplier.offer_line_id)
    }
    showSendingCPModal(supplier){
        this.sendingCPModal.open(supplier.offer_line_id,this.infoSupplier.email)
    }
    downloadfile(){
        window.open(`${environment.apiUrl}/export_commercial_offers?spgz_id=${this.selectedProduct.spgz_id}&unit_id=${this.selectedProduct.unit_id}`, '_blank');
    }
      
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
