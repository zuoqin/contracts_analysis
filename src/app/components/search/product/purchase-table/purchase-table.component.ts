
import { OnInit,ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { CONFIG } from '@config';

@Component({
    selector:"purchase-table",
    templateUrl:"./purchase-table.component.html"
})
export class PurchaseTableComponent{
    @ViewChild('selectedRangeDate') selectedRangeDate;
    tooltipOptions;
    constructor(){
        this.tooltipOptions = CONFIG.tooltipOptions;
    }


    purchaseColumns=[
        {
            id:"date",
            text:"Дата заключения контракта",
            active:true
        },
        {
            id:"customer",
            text:"Заказчик",
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
            text:"Срок исполнения",
            active:true
        },
        {
            id:"priceContract",
            text:"Цена контракта",
            active:true
        },
        {
            id:"status",
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
        
    

    purchaseData = [
        {
            date:{
                value: new Date(2018, 0, 22),
                text:"22.01.2018",
            }, 
            customer:{
                id:4234,
                name:'ГБУЗ "ГБК № 31 ДЗМ"'
            },
            volume:{
                value:3781,
                unit:"кг"
            },
            price:{
                value:98,
                status:1
            },
            term:{
                value:90,
                unit:"дней"
            },
            priceContract:370538,
            status:{
                value:1,
                text:"Исполнение завершено"
            },
            dateEnd:{
                value: new Date(2018, 0, 9),
                text:"09.01.2018",
            },
            complaint:true,
            safety:false
        },
        {
            date:{
                value: new Date(2018, 0, 29),
                text:"29.01.2018",
            },
            customer:{
                id:4234,
                name:'ГБУЗ "ГБК № 31 ДЗМ" КОНЧАЛОВСКОГО ДМЗ'
            },
            volume:{
                value:14000,
                unit:"кг"
            },
            price:{
                value:126,
                status:1
            },
            term:{
                value:365,
                unit:"дней"
            },
            priceContract:1746,
            status:{
                value:2,
                text:"Исполнение"
            },
            dateEnd:{
                value: new Date(2018, 0, 28),
                text:"28.01.2018",
            },
            complaint:false,
            safety:true
        },
        {
            date:{
                value: new Date(2018, 3, 28),
                text:"28.04.2018",
            },
            customer:{
                id:4234,
                name:'ГБУЗ "ГБК № 31 ДЗМ"'
            },
            volume:{
                value:2500,
                unit:"кг"
            },
            price:{
                value:17,
                status:2
            },
            term:{
                value:23,
                unit:"дня"
            },
            priceContract:42500,
            status:{
                value:1,
                text:"Исполнение завершено"
            },
            dateEnd:{
                value: new Date(2018, 4, 21),
                text:"21.05.2018",
            },
            complaint:false,
            safety:true
        },
        {
            date:{
                value: new Date(2018, 6, 2),
                text:"02.07.2018",
            },
            customer:{
                id:4234,
                name:'ГБУЗ МКНЦ имени А.С. Логинова ДМЗ'
            },
            volume:{
                value:18500,
                unit:"кг"
            },
            price:{
                value:19,
                status:2
            },
            term:{
                value:20,
                unit:"дней"
            },
            priceContract:351500,
            status:{
                value:2,
                text:"Исполнение"
            },
            dateEnd:{
                value: new Date(2018, 6, 22),
                text:"22.07.2018",
            },
            complaint:false,
            safety:true
        },
        {
            date:{
                value: new Date(2018, 0, 13),
                text:"13.01.2018",
            },
            customer:{
                id:4234,
                name:'ГБУЗ "ГБК № 31 ДЗМ" КОНЧАЛОВСКОГО ДМЗ'
            },
            volume:{
                value:250,
                unit:"кг"
            },
            price:{
                value:40,
                status:3
            },
            term:{
                value:3,
                unit:"дня"
            },
            priceContract:100000,
            status:{
                value:1,
                text:"Исполнение завершено"
            },
            dateEnd:{
                value: new Date(2018, 0, 16),
                text:"16.01.2018",
            },
            complaint:false,
            safety:true
        },
        {
            date:{
                value: new Date(2018, 5, 11),
                text:"11.06.2018",
            },
            customer:{
                id:4234,
                name:'ААА ГУП "МЕДИЦИНСКИЙ ЦЕНТР"'
            },
            volume:{
                value:2200,
                unit:"кг"
            },
            price:{
                value:21,
                status:1
            },
            term:{
                value:10,
                unit:"дней"
            },
            priceContract:46200,
            status:{
                value:1,
                text:"Исполнение завершено"
            },
            dateEnd:{
                value: new Date(2018, 5, 21),
                text:"21.06.2018",
            },
            complaint:false,
            safety:true
        }
    ]
  
    onSelectedDate(value){
        if(value){
            console.log(value.beginDate)
            console.log(value.endDate)
        }else{
            console.log('сбросить')
        }
    }
    onSelectedDateEnd(value){
        if(value){
            console.log(value.beginDate)
            console.log(value.endDate)
        }else{
            console.log('сбросить')
        }
    }

    isColumnActive(columnId){
        return this.purchaseColumns.filter(item=>item.id==columnId)[0].active
    }
    onSelectedColumns(value){
        this.purchaseColumns = value;
    }
   

}
