import { Injectable,OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/takeUntil';
import { environment } from '@environments';


import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { ProductServices } from './products.services';
import { map } from 'rxjs/operators';
/*Models*/
import { ProductSearch } from './../models';
@Injectable()
export class SuppliersServices{

    public addSupplierFromModal:Subject<any> = new Subject<any>();
	public addSupplierFromModalObservable = this.addSupplierFromModal.asObservable()
    

    public addDynamicSupplier:Subject<any> = new Subject<any>();
    public addDynamicSupplierObservable = this.addDynamicSupplier.asObservable()
    
    public openAddCPModal:Subject<any> = new Subject<any>();
    public openAddCPModalObservable = this.openAddCPModal.asObservable()
        
    public suppliersCountSubject:ReplaySubject<any> = new ReplaySubject<any>(1);
    public suppliersCountObservable = this.suppliersCountSubject.asObservable()

    public SelectSupplierSubject:ReplaySubject<any> = new ReplaySubject<any>(1);
    public SelectSupplierObservable = this.SelectSupplierSubject.asObservable()


    constructor(
        private productServices:ProductServices,
        private apiService: ApiService
    ){}



    getCompanyInfo(itn: string): Observable<any> {
        const params = new HttpParams()
            .set('inn', itn)

        return this.apiService.get('/inn_info',params)
          .pipe(map(data => data));
    }
    getCategories(id): Observable<any> {
        const params = new HttpParams()
            .set('id', id)

        return this.apiService.get('/suppliers/categories.json',params,'../../assets/mock')
          .pipe(map(data => data));
    }
    getCommercialOffersSent(supplier_id:number): Observable<any> {
        const params = new HttpParams()
            .set('supplier', supplier_id.toString())
        return this.apiService.get('/commercial_offers_sent',params)
          .pipe(map(data => data));
    }
    getSuppliersForProduct(selectedProduct:ProductSearch): Observable<any> {
        let params = this.productServices.getHttpParams(selectedProduct);
        return this.apiService.get('/suppliers',params)
          .pipe(map(data => data));
    }
    addSupplier(body): Observable<any>{
  
        return this.apiService.post('/add/supplier',body)
        .pipe(map(data => data));
    }
    getPriceSupplier(supplier_id): Observable<any> {
        const params = new HttpParams()
        .set('supplier_id', supplier_id.toString())
        
        return this.apiService.get('/price',params)
          .pipe(map(data => data));
    }
    
}