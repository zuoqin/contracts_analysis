import { Injectable,OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ReplaySubject } from 'rxjs';
import { environment } from '@environments';


import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { map } from 'rxjs/operators';

/*Models*/
import { ProductSearch } from '@core';
@Injectable()
export class ProductServices{


 

    public SelectProductSubject:ReplaySubject<any> = new ReplaySubject<any>(1);
    public SelectProductObservable = this.SelectProductSubject.asObservable()

    public SearchByNewProductSubject:Subject<any> = new Subject<any>();
    public SearchByNewProductObservable = this.SearchByNewProductSubject.asObservable()

    priceChartsData;
    priceChartData;
    priceProductChartsData;
    constructor(
        private apiService: ApiService
    ){
        this.priceChartsData = this.priceCharts;
        this.priceChartData = this.priceCharts;
        this.priceProductChartsData = this.priceProductCharts;

    }

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

    
  
    get(kpgzName: string): Observable<any> {
        //

        const params = new HttpParams()
            .set('context', 'product')
            .set('query', kpgzName);

        return this.apiService.get('/search',params)
          .pipe(map(data => data));
    }
    getUnits(kpgz_id: number,spgz_id?: number): Observable<any>{
        let params= new HttpParams();
        if(kpgz_id){
            params =  params.set('kpgz_id', kpgz_id.toString())
        }else{
            params =  params.set('spgz_id', spgz_id.toString())
        }
        return this.apiService.get('/units/product',params)
        .pipe(map(data => data));
    }
    getAttrs(kpgz_id: number,type?:string): Observable<any>{
        let params = new HttpParams();
        if(type && type=="spgz"){
            params = params.set('spgz_id', kpgz_id.toString())
        }else{
            params = params.set('kpgz_id', kpgz_id.toString())
        }
   

        return this.apiService.get('/attributes/product',params)
        .pipe(map(data => data));
    }
    getSubproducts(productId: number): Observable<any>{
        const params = new HttpParams()
        .set('id', productId.toString())

        return this.apiService.get('/subproducts',params)
        .pipe(map(data => data));
    }
    getProductTree(kpgz_id: number): Observable<any>{
        const params = new HttpParams()
        .set('kpgz_id', kpgz_id.toString())
        .set('depth', '1')
        
        return this.apiService.get('/product_tree',params)
        .pipe(map(data => data));
    }
    getPriceDynamics(selectedProduct:ProductSearch): Observable<any>{
        let params = this.getHttpParams(selectedProduct);
        
        return this.apiService.get('/pivot_price',params)
        .pipe(map(data => data));
    }
    getPredictionPrice(selectedProduct:ProductSearch): Observable<any>{
        let params = this.getHttpParams(selectedProduct);
        
        return this.apiService.get('/prediction_price',params)
        .pipe(map(data => data));
    }
    
    getPurchases(selectedProduct: ProductSearch): Observable<any>{
        let params = this.getHttpParams(selectedProduct);
         //params = params.set('limit', '2')
         
        return this.apiService.get('/purchase',params)
        .pipe(map(data => data));
    }
    downloadPurchases(selectedProduct: ProductSearch): Observable<any>{
         let params = this.getHttpParams(selectedProduct);

        return this.apiService.get('/export_purchases',params)
        .pipe(map(data => data));
    }
    getRegions(): Observable<any>{
        return this.apiService.get('/regions')
        .pipe(map(data => data));
    }
    getSpgz(kpgz_id: number,attr?:Array<number>): Observable<any>{
        let params = new HttpParams()
        .set('kpgz_id', kpgz_id.toString());
        if(attr){
            params = params.set('value_id', attr.toString())
        }
        return this.apiService.get('/get_spgz',params)
        .pipe(map(data => data));
    }

    getChartsData(selectedProduct:ProductSearch): Observable<any>{
        let params = this.getHttpParams(selectedProduct);
        return this.apiService.get('/price_history',params)
        .pipe(map(data => data));
    }

    addCommercialOffer(body): Observable<any>{
  
        //let params = new HttpParams(body)
  
        return this.apiService.post('/commercial_offer',body)
        .pipe(map(data => data));
    }
    getHttpParams(selectedProduct:ProductSearch){
        let params = new HttpParams()
            .set('spgz_id',selectedProduct.spgz_id.toString())

        if(selectedProduct.risk){
            params = params.set('risk', selectedProduct.risk.toString())
        } 
        if(selectedProduct.unit_id){
            params = params.set('unit_id', selectedProduct.unit_id.toString())
        }  
        if(selectedProduct.region_id && selectedProduct.region_id.length){
            params = params.set('region_id', selectedProduct.region_id.toString())
        }       
        if(selectedProduct.delivery_from){
            params = params.set('delivery_from', selectedProduct.delivery_from.toString())
        }
        if(selectedProduct.delivery_to){
            params = params.set('delivery_to', selectedProduct.delivery_to.toString())
        }
        if(selectedProduct.volume_from){
            params = params.set('volume_from', selectedProduct.volume_from.toString())
        }
        if(selectedProduct.volume_to){
            params = params.set('volume_to', selectedProduct.volume_to.toString())
        }
        return params;
    }




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
        /*{
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
        },*/
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
        /*{
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
        }*/
    ]

}
