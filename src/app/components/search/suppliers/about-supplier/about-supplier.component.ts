import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/*Services*/
import { SuppliersServices } from '@core';
@Component({
    selector:"about-supplier",
    templateUrl:"./about-supplier.component.html"
})
export class AboutSupplierComponent{
    unsubscribeAll = new Subject();
    selectedSupplier;
    aboutSuppliers;
    constructor(
        private suppliersServices:SuppliersServices,
    ){
        this.suppliersServices.SelectSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedSupplier)=>{
                this.aboutSuppliers = null;
                this.selectedSupplier = selectedSupplier;
                this.getInfoSupplier()
            })
    }
    getInfoSupplier(){
        this.suppliersServices.getInfoSupplier(this.selectedSupplier.supplier_id).subscribe(
            response => {
                if(response.data[0]){
                    this.aboutSuppliers = response.data[0];
                    console.log( this.aboutSuppliers)
                    this.suppliersServices.SupplierInfoSubject.next(this.aboutSuppliers)
                }
            },
            err => {

                console.log(err)
            }
        );
    }
    // aboutSuppliers = {
    //     region:"г. Москва",
    //     date:"10.01.2015",
    //     email:"molokovsem@gmail.com",
    //     phone:"+7 (749) 916 65 97",
    //     itn:"7728180633",    //инн
    //     iec:"771901001",     //кпп
    //     turnover:12367000,
    //     type:"Производитель",
    //     participation:true,
    //     sumOfContracts:6153000,
    //     warehouse:true,
    //     status:"Действующее"
    // }

}