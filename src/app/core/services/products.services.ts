import { Injectable,OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ReplaySubject } from 'rxjs';
import { environment } from '@environments';


import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { map } from 'rxjs/operators';


@Injectable()
export class ProductServices{


    public changePricesDynamics:ReplaySubject<any> = new ReplaySubject<any>();
    public changePricesDynamicsObservable = this.changePricesDynamics.asObservable()

    priceChartsData;
    priceChartData;
    priceProductChartsData;
    constructor(
        private apiService: ApiService
    ){
        this.priceChartsData = this.priceCharts;
        this.priceChartData = this.priceCharts;
        this.priceProductChartsData = this.priceProductCharts;
        this.changePricesDynamics.next(this.pricesDynamics);
    }
    pricesDynamics = [
        {
            date:Date.UTC(2018, 6, 1),
            market:29,
            purchase:29
        },
        {
            date:Date.UTC(2018, 5, 1),
            market:29,
            purchase:29
        },
        {
            date:Date.UTC(2018, 4, 1),
            market:30,
            purchase:30
        },
        {
            date:Date.UTC(2018, 3, 1),
            market:27,
            purchase:28
        },
        {
            date:Date.UTC(2018, 2, 1),
            market:34,
            purchase:31
        },
        {
            date:Date.UTC(2018, 1, 1),
            market:33,
            purchase:30
        },
        {
            date:Date.UTC(2018, 0, 1),
            market:34,
            purchase:32
        },
        {
            date:Date.UTC(2017, 8, 1),
            market:35,
            purchase:34
        },
        {
            date:Date.UTC(2017, 3, 1),
            market:35,
            purchase:34
        },
        {
            date:Date.UTC(2016, 8, 1),
            market:31,
            purchase:34
        },
        {
            date:Date.UTC(2016, 3, 1),
            market:30,
            purchase:34
        }
    ]
    priceProductCharts = [
        {
            name: 'Рыночная цена',
            id:"marketPrice",
            color: '#EB2424',
            type:"left",
            value:true,
            data: [
                [Date.UTC(2017, 7, 1), 33.8],
                [Date.UTC(2017, 8, 1), 33.1],
                [Date.UTC(2017, 9, 1), 33],
                [Date.UTC(2017, 10, 1), 33],
                [Date.UTC(2017, 11,  1), 33.5],
                [Date.UTC(2018, 0,  1), 33.1],
                [Date.UTC(2018, 1,  1), 33.8],
                [Date.UTC(2018, 2,  1), 33.1],
                [Date.UTC(2018, 3,  1), 33.3],
                [Date.UTC(2018, 4,  1), 33],
                [Date.UTC(2018, 5, 1), 33.9],
                [Date.UTC(2018, 6,  1), 33.6],
                [Date.UTC(2018, 7, 1), 33],
            ]
            
          },
        
        {
            name: 'Цена поставщика',
            id:"priceSupplier",
            color:'#298832',
            type:"right",
            value:true,
            data: [
                [Date.UTC(2017, 7, 1), 30.2],
                [Date.UTC(2017, 8, 1), 30],
                [Date.UTC(2017, 9, 1), 34],
                [Date.UTC(2017, 10, 1), 32],
                [Date.UTC(2017, 11, 1), 31],
                [Date.UTC(2018, 0,  1), 33],
                [Date.UTC(2018, 1, 1), 34],
                [Date.UTC(2018, 2,  1), 35],
                [Date.UTC(2018, 3,  1), 33],
                [Date.UTC(2018, 4,  1), 34],
                [Date.UTC(2018, 5, 1), 32],
                [Date.UTC(2018, 6,  1), 34],
                [Date.UTC(2018, 7, 1), 31],
            ]
        },
    ]

    priceCharts = [
        {
            name: 'Рынок в Москве',
            id:"marketMoscow",
            color: '#EB2424',
            lineWidth: 4.5,
            type:"left",
            value:true,
            marker: {
                symbol: 'circle',
                lineWidth: 0,
                radius: 4
            },
            data: [
                [Date.UTC(2017, 7, 1), 33.8],
                [Date.UTC(2017, 8, 1), 33.1],
                [Date.UTC(2017, 9, 1), 33],
                [Date.UTC(2017, 10, 1), 33],
                [Date.UTC(2017, 11,  1), 33.5],
                [Date.UTC(2018, 0,  1), 33.1],
                [Date.UTC(2018, 1,  1), 33.8],
                [Date.UTC(2018, 2,  1), 33.1],
                [Date.UTC(2018, 3,  1), 33.3],
                [Date.UTC(2018, 4,  1), 33],
                [Date.UTC(2018, 5, 1), 33.9],
                [Date.UTC(2018, 6,  1), 33.6],
                [Date.UTC(2018, 7, 1), 33],
            ]
            
          },
        {
            name: 'Закупки в Москве',
            color:'#F50671',
            type:"left",
            id:"purchasesMoscow",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 32.2],
                [Date.UTC(2017, 8, 1), 32.3],
                [Date.UTC(2017, 9, 1), 32],
                [Date.UTC(2017, 10, 1), 32],
                [Date.UTC(2017, 11,  1), 32.1],
                [Date.UTC(2018, 0,  1), 32.2],
                [Date.UTC(2018, 1,  1), 32.1],
                [Date.UTC(2018, 2, 1), 32],
                [Date.UTC(2018, 3,  1), 32],
                [Date.UTC(2018, 4,  1), 32],
                [Date.UTC(2018, 5, 1), 32.9],
                [Date.UTC(2018, 6,  1), 32],
                [Date.UTC(2018, 7, 1), 32.1],
            ]
        },
        {
            name: 'Рынок ЦФО',
            color:'aqua',
            type:"left",
            id:"marketCFO",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 30.2],
                [Date.UTC(2017, 8, 1), 31],
                [Date.UTC(2017, 9, 1), 32],
                [Date.UTC(2017, 10, 1), 30],
                [Date.UTC(2017, 11, 1), 31],
                [Date.UTC(2018, 0,  1), 33],
                [Date.UTC(2018, 1, 1), 31],
                [Date.UTC(2018, 2,  1), 35],
                [Date.UTC(2018, 3,  1), 33],
                [Date.UTC(2018, 4,  1), 34],
                [Date.UTC(2018, 5, 1), 35],
                [Date.UTC(2018, 6,  1), 31],
                [Date.UTC(2018, 7, 1), 33],
            ]
        },
        {
            name: 'Закупки ЦФО',
            color:'blueviolet',
            type:"left",
            id:"purchasesCFO",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 30.2],
                [Date.UTC(2017, 8, 1), 30],
                [Date.UTC(2017, 9, 1), 34],
                [Date.UTC(2017, 10, 1), 29],
                [Date.UTC(2017, 11, 1), 32],
                [Date.UTC(2018, 0,  1), 31],
                [Date.UTC(2018, 1, 1), 33],
                [Date.UTC(2018, 2,  1), 32],
                [Date.UTC(2018, 3,  1), 33],
                [Date.UTC(2018, 4,  1), 34],
                [Date.UTC(2018, 5, 1), 32],
                [Date.UTC(2018, 6,  1), 31],
                [Date.UTC(2018, 7, 1), 30],
            ]
        },
        {
            name: 'Рынок вне ЦФО',
            color:'orange',
            type:"left",
            id:"marketOutCFO",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 30.2],
                [Date.UTC(2017, 8, 1), 30],
                [Date.UTC(2017, 9, 1), 34],
                [Date.UTC(2017, 10, 1), 32],
                [Date.UTC(2017, 11, 1), 32],
                [Date.UTC(2018, 0,  9), 33],
                [Date.UTC(2018, 1, 1), 33],
                [Date.UTC(2018, 2,  1), 32],
                [Date.UTC(2018, 3,  1), 31],
                [Date.UTC(2018, 4,  1), 34],
                [Date.UTC(2018, 5, 1), 32],
                [Date.UTC(2018, 6,  1), 32],
                [Date.UTC(2018, 7, 1), 29],
            ]
        },
        {
            name: 'Закупки вне ЦФО',
            color:'chocolate',
            type:"left",
            id:"purchasesOutCFO",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 30.2],
                [Date.UTC(2017, 8, 1), 28],
                [Date.UTC(2017, 9, 1), 34],
                [Date.UTC(2017, 10, 1), 29],
                [Date.UTC(2017, 11, 1), 31],
                [Date.UTC(2018, 0,  1), 31],
                [Date.UTC(2018, 1, 1), 33],
                [Date.UTC(2018, 2,  1), 32],
                [Date.UTC(2018, 3,  1), 33],
                [Date.UTC(2018, 4,  1), 34],
                [Date.UTC(2018, 5, 1), 32],
                [Date.UTC(2018, 6,  1), 31],
                [Date.UTC(2018, 7, 1), 31],
            ]
        },
        {
            name: 'Рынок выбранной территории',
            id:"marketSelect",
            color:'#298832',
            type:"right",
            lineWidth: 4.5,
            value:true,
            marker: {
                symbol: 'circle',
                lineWidth: 0,
                radius: 4
            },
            data: [
                [Date.UTC(2017, 7, 1), 30.2],
                [Date.UTC(2017, 8, 1), 30],
                [Date.UTC(2017, 9, 1), 34],
                [Date.UTC(2017, 10, 1), 32],
                [Date.UTC(2017, 11, 1), 31],
                [Date.UTC(2018, 0,  1), 33],
                [Date.UTC(2018, 1, 1), 34],
                [Date.UTC(2018, 2,  1), 35],
                [Date.UTC(2018, 3,  1), 33],
                [Date.UTC(2018, 4,  1), 34],
                [Date.UTC(2018, 5, 1), 32],
                [Date.UTC(2018, 6,  1), 34],
                [Date.UTC(2018, 7, 1), 31],
            ]
        },
        {
            name: 'Закупки выбранной территории',
            color:'#3B42CE',
            type:"right",
            id:"purchasesSelect",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 33],
                [Date.UTC(2017, 8, 1), 32],
                [Date.UTC(2017, 9, 1), 31],
                [Date.UTC(2017, 10, 1), 33],
                [Date.UTC(2017, 11, 1), 33],
                [Date.UTC(2018, 0,  1), 34],
                [Date.UTC(2018, 1, 1), 34],
                [Date.UTC(2018, 2,  1), 31],
                [Date.UTC(2018, 3,  1), 33],
                [Date.UTC(2018, 4,  1), 30],
                [Date.UTC(2018, 5, 1), 31],
                [Date.UTC(2018, 6,  1), 33],
                [Date.UTC(2018, 7, 1), 32],
            ]
        },
        {
            name: 'Федералы в Москве',
            color:'cornflowerblue',
            type:"right",
            id:"federalsMoscow",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 31],
                [Date.UTC(2017, 8, 1), 33],
                [Date.UTC(2017, 9, 1), 31],
                [Date.UTC(2017, 10, 1), 31],
                [Date.UTC(2017, 11, 1), 31],
                [Date.UTC(2018, 0,  1), 34],
                [Date.UTC(2018, 1, 1), 33],
                [Date.UTC(2018, 2,  1), 32],
                [Date.UTC(2018, 3,  1), 32],
                [Date.UTC(2018, 4,  1), 32],
                [Date.UTC(2018, 5, 1), 33],
                [Date.UTC(2018, 6,  1), 31],
                [Date.UTC(2018, 7, 1), 32],
            ]
        },
        {
            name: 'Федералы вне Москвы',
            color:'orchid',
            type:"right",
            id:"federalsOutMoscow",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 32],
                [Date.UTC(2017, 8, 1), 30],
                [Date.UTC(2017, 9, 1), 31],
                [Date.UTC(2017, 10, 1), 31],
                [Date.UTC(2017, 11, 1), 32],
                [Date.UTC(2018, 0,  1), 34],
                [Date.UTC(2018, 1, 1), 32],
                [Date.UTC(2018, 2,  1), 32],
                [Date.UTC(2018, 3,  1), 33],
                [Date.UTC(2018, 4,  1), 33],
                [Date.UTC(2018, 5, 1), 31],
                [Date.UTC(2018, 6,  1), 31],
                [Date.UTC(2018, 7, 1), 32],
            ]
        },
        {
            name: 'Муниципалы в Москве',
            color:'#b8b838',
            type:"right",
            id:"municipalsMoscow",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 30],
                [Date.UTC(2017, 8, 1), 31],
                [Date.UTC(2017, 9, 1), 33],
                [Date.UTC(2017, 10, 1), 28],
                [Date.UTC(2017, 11, 1), 30],
                [Date.UTC(2018, 0,  1), 30],
                [Date.UTC(2018, 1, 1), 31],
                [Date.UTC(2018, 2,  1), 34],
                [Date.UTC(2018, 3,  1), 31],
                [Date.UTC(2018, 4,  1), 32],
                [Date.UTC(2018, 5, 1), 31],
                [Date.UTC(2018, 6,  1), 34],
                [Date.UTC(2018, 7, 1), 33],
            ]
        },
        {
            name: 'Муниципалы вне Москвы',
            color:'palegreen',
            type:"right",
            id:"municipalsOutMoscow",
            value:false,
            data: [
                [Date.UTC(2017, 7, 1), 33],
                [Date.UTC(2017, 8, 1), 32],
                [Date.UTC(2017, 9, 1), 31],
                [Date.UTC(2017, 10, 1), 31],
                [Date.UTC(2017, 11, 1), 33],
                [Date.UTC(2018, 0,  1), 34],
                [Date.UTC(2018, 1, 1), 32],
                [Date.UTC(2018, 2,  1), 31],
                [Date.UTC(2018, 3,  1), 30],
                [Date.UTC(2018, 4,  1), 32],
                [Date.UTC(2018, 5, 1), 31],
                [Date.UTC(2018, 6,  1), 34],
                [Date.UTC(2018, 7, 1), 30],
            ]
        }
    ]
  
    get(kpgzName: string): Observable<any> {
        //

        const params = new HttpParams()
            .set('context', 'product')
            .set('query', kpgzName);

        return this.apiService.get('/search',params)
          .pipe(map(data => data));
    }
    // getЗкщвгсе(spgzId: string): Observable<any> {
	// 	const uri = `${environment.apiUrl}device/${spgzId}/state`;
	// 	return super.send<any>('GET', uri);
	// }

}