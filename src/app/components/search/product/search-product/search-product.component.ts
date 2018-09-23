import { Component, OnInit } from '@angular/core';

@Component({
    selector:"search",
    templateUrl:"./search-product.component.html"
})
export class SearchProductComponent implements OnInit{
    loadData:boolean = true;
    dataColumns;
    suppliersData;
    onLoadData(){
        this.loadData = true;
    }
    ngOnInit(){
        let that = this;
        setTimeout(()=>{
            that.suppliersData = [
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


            that.dataColumns=[
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
        })
    }
   
    


}
