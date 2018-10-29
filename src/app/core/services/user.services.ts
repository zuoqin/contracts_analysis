import { Injectable } from '@angular/core';

import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserServices{

    managerUserEmailList;
    constructor(
        private apiService: ApiService
    ){}



    getEmailManagerList(): Observable<any> {


        return this.apiService.get('/outbox_list')
          .pipe(map(data => data));
    }
    sendCpEmail(body): Observable<any> {

        
        return this.apiService.post('/add_mail',body)
          .pipe(map(data => data));
    }

}