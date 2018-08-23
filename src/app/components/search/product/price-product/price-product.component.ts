
import { Component, OnInit } from '@angular/core';
import { ProductServices } from '@services/product.services';
import { Chart } from 'angular-highcharts';

declare var require: any;
const Highcharts = require('highcharts');
Highcharts.setOptions({
    lang: {
        loading: 'Загрузка...',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        exportButtonTitle: "Экспорт",
        printButtonTitle: "Печать",
        rangeSelectorFrom: "С",
        rangeSelectorTo: "По",
        rangeSelectorZoom: "Период",
        downloadPNG: 'Скачать PNG',
        downloadJPEG: 'Скачать JPEG',
        downloadPDF: 'Скачать PDF',
        downloadSVG: 'Скачать SVG',
        printChart: 'Напечатать график'
    }
});

@Component({
    selector:"price-product",
    templateUrl:"./price-product.component.html"
})




export class PriceProductComponent implements OnInit{
    priceChartsData;
    constructor(
        private productServices:ProductServices
    ){
        this.priceChartsData = this.productServices.price;
    }

    chart = new Chart({    
        chart: {
            type: 'spline',
            backgroundColor: '#fff',
            plotBackgroundColor: '#f5f5f5',
        },
        legend: {
            enabled: false
        },
        title: {
          text: ''
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false,
                    lineWidth: 1,
                    lineColor: null // inherit from series
                },
                states: {
                    hover: {
                        enabled: true,
                        halo: {
                            size: 0
                        }
                    }
                }
            }
        },
        yAxis: {     
            allowDecimals: false,
            lineWidth: 0, 
            labels: {
                format: '{value} р.',
                style: {
                    color: '#6c6b6b',
                    fontSize:"18px",
                    fontFamily: 'Avenir Next, sans-serif',
                }  
            },
            title:{
                text:""
            },
            gridLineColor: '#b7b7b7'
        },
        xAxis: {
            lineWidth: 0,
            type: 'datetime',
            alternateGridColor: '#eeeeee',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%b',
                year: '%b'
            },
            labels: {
                style: {
                    color: '#6c6b6b',
                    fontSize:"18px",
                    fontFamily: 'Avenir Next, sans-serif',
                }  
            },
            
            plotLines: [{
                color: '#979797',
                width:1.5,
                value: Date.UTC(2018, 0, 0),  
                label: {
                     y: -15,
                  //  x:3,
                    useHTML: true,
                    text: '2017 год&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018 год',
                    textAlign: 'center',
                    verticalAlign:"bottom",
                    rotation: 0,
                    style: {
                        color: '#6c6b6b',
                        fontSize:"13px",
                        fontFamily: 'Avenir Next, sans-serif',
                    }  
                    
                }
            }],
        },
        tooltip:{
            backgroundColor: '#fffdfd',
            borderRadius:5,
            borderColor:"gray",
            crosshairs: [{
                width: 1,
                dashStyle: 'solid',
                color: 'rgba(71, 71, 71, 0.89)'
            },
            {
                width: 1,
                dashStyle: 'solid',
                color: 'rgba(71, 71, 71, 0.89)'
            }],
            formatter: function() {
                return this.y + ' р.';// +this.series.name ;
            },
            positioner: function(labelWidth, labelHeight, point) {
                var tooltipX = point.plotX + 20;
                var tooltipY = point.plotY - 10;
                return {
                    x: 0,
                    y: tooltipY
                };
            },
            useHTML: true,
            borderWidth: 0,
            style:{
                padding: 0,
                color: '#6c6b6b',
                fontSize:"18px",
                fontFamily: 'Avenir Next, sans-serif',
            }
        },
        credits: {
          enabled: false
        },
        series: []
      });
  
      ngOnInit(){
        
        this.priceChartsData.map((series)=>{
           // console.log(series)
            this.chart.addSerie({
                name:series.name,
                data: (function () {
                  let data = [];
                    data.push(series.data)
                    return data[0];
                }()) 
            }) 
        })
        
      }
     
}
