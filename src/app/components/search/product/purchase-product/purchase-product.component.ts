import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector:"purchase-product",
    templateUrl:"./purchase-product.component.html"
})
export class PurchaseProductComponent{
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
            valume:{
                value:3781,
                unit:"кг"
            },
            price:98,
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
            complaint:true
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
            valume:{
                value:14000,
                unit:"кг"
            },
            price:126,
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
            complaint:false
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
            valume:{
                value:2500,
                unit:"кг"
            },
            price:17,
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
            complaint:false
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
            valume:{
                value:18500,
                unit:"кг"
            },
            price:19,
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
            complaint:false
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
            valume:{
                value:250,
                unit:"кг"
            },
            price:40,
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
            complaint:false
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
            valume:{
                value:2200,
                unit:"кг"
            },
            price:21,
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
            complaint:false
        }
   ]
  

    


}
