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
                    this.suppliersServices.SupplierInfoSubject.next(this.aboutSuppliers)
                }
            },
            err => {

                console.log(err)
            }
        );
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}