import { Injectable,OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/takeUntil';
import { environment } from '@environments';


import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { map } from 'rxjs/operators';

@Injectable()
export class SuppliersServices{
    public changeGraphData:Subject<any> = new Subject<any>();
	public changeGraphDataObservable = this.changeGraphData.asObservable()


    public addSupplierFromModal:Subject<any> = new Subject<any>();
	public addSupplierFromModalObservable = this.addSupplierFromModal.asObservable()
    

    public addDynamicSupplier:Subject<any> = new Subject<any>();
    public addDynamicSupplierObservable = this.addDynamicSupplier.asObservable()
    
    public openAddCPModal:Subject<any> = new Subject<any>();
    public openAddCPModalObservable = this.openAddCPModal.asObservable()
    

    constructor(
        private apiService: ApiService
    ){}



    getCompanyInfo(itn: string): Observable<any> {
        const params = new HttpParams()
            .set('inn', itn)

        return this.apiService.get('/getcompanyinfo',params)
          .pipe(map(data => data));
    }

    
}