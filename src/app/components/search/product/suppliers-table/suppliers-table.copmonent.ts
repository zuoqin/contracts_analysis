import { Component,ViewChild } from '@angular/core';

@Component({
    selector:"suppliers-table",
    templateUrl:"./suppliers-table.component.html"
})
export class SuppliersTableComponent{
    @ViewChild('addCommercialProposalModal') addCommercialProposalModal;
    @ViewChild('addSupplierModal') addSupplierModal;
    @ViewChild('sentCPModal') sentCPModal;
    @ViewChild('sendingCPModal') sendingCPModal;
    suppliersData = [
        {
            date:{
                value: new Date(2018, 3, 3),
                text:"03.04.2018",
            }, 
            supplier:{
                id:4234,
                name:'ООО "РегионПродукт"'
            },
            volume:{
                value:14000,
                unit:"кг"
            },
            price:{
                value:16.9,
                status:1
            },
            term:{
                value:"10 дней",
                status:1,
            },
            participation:1,
            commercialProposal:{
                send:true,
            },
            calls:{
                value: true,
            },
        },
        {
            date:{
                value: new Date(2018, 4, 22),
                text:"22.05.2018",
            }, 
            supplier:{
                id:4234,
                name:'ООО СЕЛЬСКИЙ БУТИК'
            },
            volume:{
                value:22000,
                unit:"кг"
            },
            price:{
                value:23,
                status:1
            },
            term:{
                value:"Месяц",
                status:2
            },
            participation:2,
            commercialProposal:{
                send:true,
            },
            calls:{
                value: false,
            },
        },
        {
            date:{
                value: new Date(2018, 4, 15),
                text:"22.05.2018",
            }, 
            supplier:{
                id:4234,
                name:'ООО "Астон"'
            },
            volume:{
                value:480,
                unit:"кг"
            },
            price:{
                value:"95",
                status:2
            },
            term:{
                value:"3 месяца",
                status:2
            },
            participation:1,
            commercialProposal:{
                send:false,
            },
            calls:{
                value: false,
            },
        },
        {
            date:{
                value: new Date(2018, 6, 11),
                text:"22.05.2018",
            }, 
            supplier:{
                id:4234,
                name:'ООО "Астон"'
            },
            volume:{
                value:480,
                unit:"кг"
            },
            price:{
                value:"95",
                status:2
            },
            term:{
                value:"3 месяца",
                status:2
            },
            participation:1,
            commercialProposal:{
                send:true,
            },
            calls:{
                value: false,
            },
        },
    ]
    suppliersColumns=[
        {
            id:"date",
            text:"Дата получения цены",
            active:true
        },
        {
            id:"supplier",
            text:"Поставщик",
            active:true
        },
        {
            id:"volume",
            text:"Объем",
            active:true
        },
        {
            id:"price",
            text:"Цена, руб.",
            active:true
        },
        {
            id:"term",
            text:"Срок поставки",
            active:true
        },
        {
            id:"participation",
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

    isColumnActive(columnId){
        return this.suppliersColumns.filter(item=>item.id==columnId)[0].active
    }
    onSelectedColumns(value){
        this.suppliersColumns = value;
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
    showSendingCPModal(){
        this.sendingCPModal.open()
    }
    
}