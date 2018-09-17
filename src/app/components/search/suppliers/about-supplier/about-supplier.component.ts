import { Component } from '@angular/core';

@Component({
    selector:"about-supplier",
    templateUrl:"./about-supplier.component.html"
})
export class AboutSupplierComponent{
    aboutSuppliers = {
        region:"г. Москва",
        date:"10.01.2015",
        email:"molokovsem@gmail.com",
        phone:"+7 (749) 916 65 97",
        itn:"7728180633",    //инн
        iec:"771901001",     //кпп
        turnover:12367000,
        type:"Производитель",
        participation:true,
        sumOfContracts:6153000,
        warehouse:true,
        status:"Действующее"
    }

}