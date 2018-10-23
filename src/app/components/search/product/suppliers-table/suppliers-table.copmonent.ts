import { Component,ViewChild,Input,OnInit } from '@angular/core';
/*Services*/
import { SuppliersServices,ProductServices } from '@core';
/*Models*/
import { ProductSearch } from '@core';

import { CONFIG } from '@config';
@Component({
    selector:"suppliers-table",
    templateUrl:"./suppliers-table.component.html"
})
export class SuppliersTableComponent implements OnInit{
    selectedProduct:ProductSearch;
    suppliersData;
    ifLoadData:boolean = false;
    @Input('noShowSupplier') noShowSupplier;
    
    messageResponse = CONFIG.messageResponse;
    @ViewChild('addCommercialProposalModal') addCommercialProposalModal;
    @ViewChild('addSupplierModal') addSupplierModal;
    @ViewChild('sentCPModal') sentCPModal;
    @ViewChild('sendingCPModal') sendingCPModal;

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
            id:"commercialProposal",
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
        private productServices:ProductServices
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
            
            let date = item.date.split('/');
            item.date = {
                value: new Date(date[2], date[1]-1, date[0]),
                text:`${date[0]}.${date[1]}.${date[2]}`,
            }
            
        })
        this.suppliersData = data;
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
    showSentCPModal(){
        this.sentCPModal.open()
    }
    showSendingCPModal(supplier_id){
        this.sendingCPModal.open()
    }
    
}