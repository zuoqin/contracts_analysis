import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/*Services*/
import { ProductServices } from '@core';

@Component({
    selector:"search",
    templateUrl:"./search-product.component.html"
})
export class SearchProductComponent implements OnInit{
    unsubscribeAll = new Subject();
    loadData:boolean = false;
    suppliersData;
    selectedProduct;
    constructor(
        private productServices:ProductServices
    ){
        this.productServices.SearchByNewProductObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedProduct)=>{
                this.loadData = false;
            })
    }
    onLoadData(data){
        this.selectedProduct = data;
        
        this.loadData = data;
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


           
        })
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
    


}
