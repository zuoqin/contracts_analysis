import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/*Plugins*/
import { Chart } from 'angular-highcharts';
/*Srvices */
import { SuppliersServices } from '@core';

declare var require: any;
const Highcharts = require('highcharts');
Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ' '
    }
  });


@Component({
    selector:"supplier-risk-index",
    templateUrl:"./supplier-risk-index.component.html"
})

export class SupplierRiskIndexComponent implements OnInit{
    unsubscribeAll = new Subject();
    selectedSupplier;
    supplierRiskInfo;
    supplierRiskInfoCharts;
    priceChartsData;
    constructor(
        private suppliersServices:SuppliersServices
    ){
        this.suppliersServices.SelectSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((selectedSupplier)=>{
                this.selectedSupplier = selectedSupplier;
    
                this.getRiskSupplier()
            })
    }
    getRiskSupplier(){
        this.suppliersServices.getRiskSupplier(this.selectedSupplier.supplier_id)
            .subscribe(
                response => {
                    
                    let data = response.data;
                    this.supplierRiskInfoCharts = {
                        progress:{
                            name:"Заключенные",
                            chartName:"Заключенные",
                            count:data.progress.count,
                            sum:data.progress.sum,
                            color:'#2c4155'
                        },
                        done:{
                            name:"Своевременно исполненные",
                            chartName:"Исполненные",
                            count:data.done.count,
                            sum:data.done.sum,
                            color:'#c8c8c8'
                        },
                     
                        reject:{
                            name:"Расторгнутые",
                            chartName:"Расторгнутые",
                            count:data.reject.count,
                            sum:data.reject.sum,
                            color:'#b33434'
                        }
                    };

                    this.priceChartsData = [];
                    for (let key in this.supplierRiskInfoCharts) {
                        let value = this.supplierRiskInfoCharts[key];
                        this.priceChartsData.push({
                            name: value.chartName,
                            y: value.sum,
                            color: value.color
                        })
                        
                    }
                    this.supplierRiskInfoCharts['scale'] = response.scale;
                    this.supplierRiskInfoCharts['is_new'] = response.is_new;
                    this.supplierRiskInfoCharts['risk_index'] = response.risk_index;
                    this.supplierRiskInfoCharts['is_one_customer'] = response.is_one_customer;
                    this.supplierRiskInfoCharts['is_affiliate'] = response.is_affiliate;



                    this.showGraph();

            
                },
                err => {
                    
                }
            );
    }
     

    // priceChartsData = [
      
    //     {
    //         "name": "Заключенные",
    //         "y": 2474400,
    //         color: '#2C4155'
    
    //     },
    //     {
            
    //         "name": "Своевременно исполненные",
    //         "y": 2474400,
    //         color: '#C8C8C8'
   
    //     },
    //     {
    //         "name": "Расторгнутые",
    //         "y": 0,
    //         color: '#B12726'
        
    //     }
    // ]
    chart = new Chart({
        chart: {
            type: 'column',
            marginRight: 0,
            marginLeft: 0,
            spacingTop: 20
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type:'category',
            labels:{
                y:30,
                style: {
                    color: '#6C6B6B',
                    fontSize: '18px',
                    fontFamily:"Avenir Next"
                }
            },
            lineColor: '#CED0DA',
            tickColor: 'transparent',
            lineWidth: 2
        },
        yAxis: {
            gridLineColor: "transparent",
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
              
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f}',
                    y:-40,
                    style: {
                        color: '#2C4155',
                        fontSize: '20px',
                        fontFamily:"Avenir Next",
                        fontWeight:"bold",
                        
                    }
                },
                // groupPadding: 0.222,
            }
        },
    
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> руб.<br/>',
            backgroundColor:"#FFF"
        },
    
        series: [],
        credits: {enabled: false}
    })

    ngOnInit(){
       
    }
    showGraph(){

        if(this.chart.ref){
            this.removeSerie();
        }
        this.chart.addSerie({data: this.priceChartsData}) 
    }

    
    removeSerie(){
        if(this.chart.ref.series.length){
            this.chart.removeSerie(this.chart.ref.series.length - 1);
        }
        if(this.chart.ref.series.length){
            this.removeSerie()
        }
    }

}