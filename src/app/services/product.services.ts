import { Injectable,OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ReplaySubject } from 'rxjs';
@Injectable()
export class ProductServices{
    public changeGraphData:Subject<any> = new Subject<any>();
	public changeGraphDataObservable = this.changeGraphData.asObservable()

    public changePricesDynamics:ReplaySubject<any> = new ReplaySubject<any>();
    public changePricesDynamicsObservable = this.changePricesDynamics.asObservable()

    priceChartsData;
    priceData;
    
    
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


    priceCharts = [
        {
            name: 'Рынок в Москве',
            id:"marketMoscow",
            color: '#EB2424',
            lineWidth: 4.5,
            type:"left",
            marker: {
                symbol: 'circle',
                lineWidth: 0,
                radius: 4
            },
            data: [
                [Date.UTC(2017, 7, 25), 33.8],
                [Date.UTC(2017, 8, 25), 33.1],
                [Date.UTC(2017, 9, 25), 33],
                [Date.UTC(2017, 10, 25), 33],
                [Date.UTC(2017, 11,  6), 33.5],
                [Date.UTC(2017, 11, 25), 33.2],
                [Date.UTC(2018, 0,  4), 33.1],
                [Date.UTC(2018, 0, 24), 33.5],
                [Date.UTC(2018, 1,  4), 33.8],
                [Date.UTC(2018, 1, 14), 33.4],
                [Date.UTC(2018, 2,  6), 33.1],
                [Date.UTC(2018, 2, 24), 33],
                [Date.UTC(2018, 3,  1), 33.3],
                [Date.UTC(2018, 3, 27), 33.5],
                [Date.UTC(2018, 4,  4), 33],
                [Date.UTC(2018, 4, 19), 33.5],
                [Date.UTC(2018, 5, 29), 33.9],
                [Date.UTC(2018, 6,  4), 33.6],
                [Date.UTC(2018, 7, 19), 33],
            ]
            
          },
        {
            name: 'Закупки в Москве',
            color:'#F50671',
            type:"left",
            id:"purchasesMoscow",
            data: [
                [Date.UTC(2017, 7, 2), 32.2],
                [Date.UTC(2017, 8, 15), 32.3],
                [Date.UTC(2017, 9, 5), 32],
                [Date.UTC(2017, 10, 10), 32],
                [Date.UTC(2017, 11,  15), 32.1],
                [Date.UTC(2017, 11, 26), 32.2],
                [Date.UTC(2018, 0,  14), 32.2],
                [Date.UTC(2018, 0, 20), 32.9],
                [Date.UTC(2018, 1,  4), 32.1],
                [Date.UTC(2018, 1, 9), 32.2],
                [Date.UTC(2018, 2,  14), 32],
                [Date.UTC(2018, 2, 25), 32],
                [Date.UTC(2018, 3,  10), 32],
                [Date.UTC(2018, 3, 17), 32.5],
                [Date.UTC(2018, 4,  4), 32],
                [Date.UTC(2018, 4, 9), 32.1],
                [Date.UTC(2018, 5, 14), 32.9],
                [Date.UTC(2018, 6,  19), 32],
                [Date.UTC(2018, 7, 9), 32.1],
            ]
        },
        {
            name: 'Рынок ЦФО',
            color:'aqua',
            type:"left",
            id:"marketCFO",
            data: [
                [Date.UTC(2017, 7, 1), 30.2],
                [Date.UTC(2017, 8, 3), 31],
                [Date.UTC(2017, 9, 7), 32],
                [Date.UTC(2017, 10, 1), 30],
                [Date.UTC(2017, 11, 6), 31],
                [Date.UTC(2018, 0,  13), 33],
                [Date.UTC(2018, 1, 19), 31],
                [Date.UTC(2018, 2,  24), 35],
                [Date.UTC(2018, 3,  1), 33],
                [Date.UTC(2018, 4,  14), 34],
                [Date.UTC(2018, 5, 1), 35],
                [Date.UTC(2018, 6,  9), 31],
                [Date.UTC(2018, 7, 9), 33],
            ]
        },
        {
            name: 'Закупки ЦФО',
            color:'blueviolet',
            type:"left",
            id:"purchasesCFO",
            data: [
                [Date.UTC(2017, 7, 15), 30.2],
                [Date.UTC(2017, 8, 5), 30],
                [Date.UTC(2017, 9, 15), 34],
                [Date.UTC(2017, 10, 11), 29],
                [Date.UTC(2017, 11, 6), 32],
                [Date.UTC(2018, 0,  14), 31],
                [Date.UTC(2018, 1, 19), 33],
                [Date.UTC(2018, 2,  14), 32],
                [Date.UTC(2018, 3,  1), 33],
                [Date.UTC(2018, 4,  14), 34],
                [Date.UTC(2018, 5, 4), 32],
                [Date.UTC(2018, 6,  9), 31],
                [Date.UTC(2018, 7, 19), 30],
            ]
        },
        {
            name: 'Рынок вне ЦФО',
            color:'orange',
            type:"left",
            id:"marketOutCFO",
            data: [
                [Date.UTC(2017, 7, 15), 30.2],
                [Date.UTC(2017, 8, 2), 30],
                [Date.UTC(2017, 9, 3), 34],
                [Date.UTC(2017, 10, 1), 32],
                [Date.UTC(2017, 11, 16), 32],
                [Date.UTC(2018, 0,  9), 33],
                [Date.UTC(2018, 1, 9), 33],
                [Date.UTC(2018, 2,  4), 32],
                [Date.UTC(2018, 3,  1), 31],
                [Date.UTC(2018, 4,  4), 34],
                [Date.UTC(2018, 5, 1), 32],
                [Date.UTC(2018, 6,  1), 32],
                [Date.UTC(2018, 7, 9), 29],
            ]
        },
        {
            name: 'Закупки вне ЦФО',
            color:'chocolate',
            type:"left",
            id:"purchasesOutCFO",
            data: [
                [Date.UTC(2017, 7, 15), 30.2],
                [Date.UTC(2017, 8, 5), 28],
                [Date.UTC(2017, 9, 5), 34],
                [Date.UTC(2017, 10, 12), 29],
                [Date.UTC(2017, 11, 16), 31],
                [Date.UTC(2018, 0,  24), 31],
                [Date.UTC(2018, 1, 29), 33],
                [Date.UTC(2018, 2,  4), 32],
                [Date.UTC(2018, 3,  23), 33],
                [Date.UTC(2018, 4,  4), 34],
                [Date.UTC(2018, 5, 19), 32],
                [Date.UTC(2018, 6,  19), 31],
                [Date.UTC(2018, 7, 19), 31],
            ]
        },
        {
            name: 'Рынок выбранной территории',
            id:"marketSelect",
            color:'#298832',
            type:"right",
            lineWidth: 4.5,
            marker: {
                symbol: 'circle',
                lineWidth: 0,
                radius: 4
            },
            data: [
                [Date.UTC(2017, 7, 5), 30.2],
                [Date.UTC(2017, 8, 5), 30],
                [Date.UTC(2017, 9, 5), 34],
                [Date.UTC(2017, 10, 1), 32],
                [Date.UTC(2017, 11, 6), 31],
                [Date.UTC(2018, 0,  24), 33],
                [Date.UTC(2018, 1, 9), 34],
                [Date.UTC(2018, 2,  14), 35],
                [Date.UTC(2018, 3,  10), 33],
                [Date.UTC(2018, 4,  4), 34],
                [Date.UTC(2018, 5, 14), 32],
                [Date.UTC(2018, 6,  19), 34],
                [Date.UTC(2018, 7, 9), 31],
            ]
        },
        {
            name: 'Закупки выбранной территории',
            color:'#3B42CE',
            type:"right",
            id:"purchasesSelect",
            data: [
                [Date.UTC(2017, 7, 5), 33],
                [Date.UTC(2017, 8, 15), 32],
                [Date.UTC(2017, 9, 5), 31],
                [Date.UTC(2017, 10, 1), 33],
                [Date.UTC(2017, 11, 16), 33],
                [Date.UTC(2018, 0,  4), 34],
                [Date.UTC(2018, 1, 9), 34],
                [Date.UTC(2018, 2,  4), 31],
                [Date.UTC(2018, 3,  15), 33],
                [Date.UTC(2018, 4,  4), 30],
                [Date.UTC(2018, 5, 14), 31],
                [Date.UTC(2018, 6,  22), 33],
                [Date.UTC(2018, 7, 9), 32],
            ]
        },
        {
            name: 'Федералы в Москве',
            color:'cornflowerblue',
            type:"right",
            id:"federalsMoscow",
            data: [
                [Date.UTC(2017, 7, 5), 31],
                [Date.UTC(2017, 8, 15), 33],
                [Date.UTC(2017, 9, 5), 31],
                [Date.UTC(2017, 10, 1), 31],
                [Date.UTC(2017, 11, 6), 31],
                [Date.UTC(2018, 0,  24), 34],
                [Date.UTC(2018, 1, 9), 33],
                [Date.UTC(2018, 2,  4), 32],
                [Date.UTC(2018, 3,  10), 32],
                [Date.UTC(2018, 4,  4), 32],
                [Date.UTC(2018, 5, 4), 33],
                [Date.UTC(2018, 6,  29), 31],
                [Date.UTC(2018, 7, 19), 32],
            ]
        },
        {
            name: 'Федералы вне Москвы',
            color:'orchid',
            type:"right",
            id:"federalsOutMoscow",
            data: [
                [Date.UTC(2017, 7, 5), 32],
                [Date.UTC(2017, 8, 5), 30],
                [Date.UTC(2017, 9, 19), 31],
                [Date.UTC(2017, 10, 1), 31],
                [Date.UTC(2017, 11, 16), 32],
                [Date.UTC(2018, 0,  14), 34],
                [Date.UTC(2018, 1, 19), 32],
                [Date.UTC(2018, 2,  14), 32],
                [Date.UTC(2018, 3,  10), 33],
                [Date.UTC(2018, 4,  4), 33],
                [Date.UTC(2018, 5, 14), 31],
                [Date.UTC(2018, 6,  29), 31],
                [Date.UTC(2018, 7, 9), 32],
            ]
        },
        {
            name: 'Муниципалы в Москве',
            color:'#b8b838',
            type:"right",
            id:"municipalsMoscow",
            data: [
                [Date.UTC(2017, 7, 14), 30],
                [Date.UTC(2017, 8, 1), 31],
                [Date.UTC(2017, 9, 25), 33],
                [Date.UTC(2017, 10, 1), 28],
                [Date.UTC(2017, 11, 26), 30],
                [Date.UTC(2018, 0,  4), 30],
                [Date.UTC(2018, 1, 29), 31],
                [Date.UTC(2018, 2,  14), 34],
                [Date.UTC(2018, 3,  1), 31],
                [Date.UTC(2018, 4,  4), 32],
                [Date.UTC(2018, 5, 4), 31],
                [Date.UTC(2018, 6,  9), 34],
                [Date.UTC(2018, 7, 19), 33],
            ]
        },
        {
            name: 'Муниципалы вне Москвы',
            color:'palegreen',
            type:"right",
            id:"municipalsOutMoscow",
            data: [
                [Date.UTC(2017, 7, 1), 33],
                [Date.UTC(2017, 8, 5), 32],
                [Date.UTC(2017, 9, 9), 31],
                [Date.UTC(2017, 10, 1), 31],
                [Date.UTC(2017, 11, 7), 33],
                [Date.UTC(2018, 0,  21), 34],
                [Date.UTC(2018, 1, 19), 32],
                [Date.UTC(2018, 2,  4), 31],
                [Date.UTC(2018, 3,  1), 30],
                [Date.UTC(2018, 4,  4), 32],
                [Date.UTC(2018, 5, 14), 31],
                [Date.UTC(2018, 6,  19), 34],
                [Date.UTC(2018, 7, 9), 30],
            ]
        }
    ]
    constructor(){
        this.priceChartsData = this.priceCharts;
        this.priceData = this.priceCharts;
        this.changePricesDynamics.next(this.pricesDynamics)
    }

}