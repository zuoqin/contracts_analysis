import { Component,OnInit, Input,SimpleChanges,SimpleChange } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


/*Plugins*/
import { Chart } from 'angular-highcharts';

declare var require: any;
const Highcharts = require('highcharts');
Highcharts.setOptions({
    lang: {
        loading: 'Загрузка...',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек'],
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
    selector:"price-chart",
    templateUrl:"./price-chart.component.html"
})

export class PriceChartComponent implements OnInit{

    @Input() set data(value) {
        this.priceChartsData = value;
        this.showGraph();
    }
  
    priceChartsData;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    plotLines = {
        color: '#979797',
        width:1.5,
        value: Date.UTC(2018, 0, 0),  
        label: {
            y: -15,
            useHTML: true,
            text: '',
            textAlign: 'center',
            verticalAlign:"bottom",
            rotation: 0,
            style: {
                color: '#6c6b6b',
                fontSize:"13px",
                fontFamily: 'Avenir Next, sans-serif',
            }  
            
        }
    }
    chart = new Chart({    
        chart: {
            type: 'spline',
            backgroundColor: '#fff',
            plotBackgroundColor: '#f5f5f5',
            marginRight: 0
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
                    lineColor: null
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
            tickInterval: 24 * 3600 * 1000*30,
            dateTimeLabelFormats: {
                month: '%b',
                year: '%b'
            },
            labels: {
                step: 1,
                
                style: {
                    color: '#6c6b6b',
                    fontSize:"16px",
                    fontFamily: 'Avenir Next, sans-serif',
                }  
            },
            plotLines:[]
           
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
                return this.y + ' р. - '+ this.series.name;
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

    constructor(){
            this.chart.ref$.subscribe(ref => {
                if(this.priceChartsData){
                    this.setYearseparator()
                }
            });
    }
    ngOnInit(){
   
     
    }
    showGraph(){
        console.log(this.priceChartsData)

        if(!this.priceChartsData){
            return;
        }
        if(this.chart.ref){
           this.removeSerie();
        }

        this.priceChartsData.map((series)=>{
            let addSeries = {
                name:series.name,
                color:series.color,
                marker: {
                    symbol: 'circle',
                        lineWidth: 0,
                        radius: 4
                },
                data: (function () {
                    let data = [];
                    data.push(series.data)
                    return data[0];
                }()) 
            }
            if(series.lineWidth){
                addSeries['lineWidth'] = 4.5;
            }
            this.chart.addSerie(addSeries) 
        })
    }
    setYearseparator(){
        let years = [];
        this.priceChartsData.map((serie)=>{
            serie.data.map(point=>{
                let year = new Date(point[0]).getFullYear()
                if(years.indexOf(year)<0){
                    years.push(year)
                } 
            })
        })
        for (let i = 0; i < years.length-1; i++) {
            let currentPlotlines = JSON.parse(JSON.stringify(this.plotLines)) ;
            currentPlotlines.value = Date.UTC(years[i]+1, 0, 1);
            currentPlotlines.label.text =  `${years[i]} год&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${years[i]+1} год`
            this.chart.ref.options.xAxis[0].plotLines.push(currentPlotlines)
        }
    }

    removeSerie(){
        if(this.chart.ref.series.length){
            this.chart.removeSerie(this.chart.ref.series.length - 1);
        }
        if(this.chart.ref.series.length){
            this.removeSerie()
        }
    }
    ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
    }
      
     
}