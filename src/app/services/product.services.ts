import { Injectable } from '@angular/core';
import { SeriesOptions } from 'highcharts';

@Injectable()
export class ProductServices {
    price = [
        {
            name: 'Рынок в Москве',
            id:"1",
            color: '#fe1b1b',
            lineWidth: 4.5,
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
            name: 'Рынок выбранной территории',
            id:"2",
            color:'#33953c',
            lineWidth: 4.5,
            marker: {
                symbol: 'circle',
                lineWidth: 0,
                radius: 4
            },
            data: [
                [Date.UTC(2017, 7, 2), 33.2],
                [Date.UTC(2017, 8, 15), 33.3],
                [Date.UTC(2017, 9, 5), 33],
                [Date.UTC(2017, 10, 10), 33],
                [Date.UTC(2017, 11,  15), 33.1],
                [Date.UTC(2017, 11, 26), 33.2],
                [Date.UTC(2018, 0,  14), 33.2],
                [Date.UTC(2018, 0, 20), 33.9],
                [Date.UTC(2018, 1,  4), 33.1],
                [Date.UTC(2018, 1, 9), 33.2],
                [Date.UTC(2018, 2,  14), 33],
                [Date.UTC(2018, 2, 25), 33],
                [Date.UTC(2018, 3,  10), 33],
                [Date.UTC(2018, 3, 17), 33.5],
                [Date.UTC(2018, 4,  4), 33],
                [Date.UTC(2018, 4, 9), 33.1],
                [Date.UTC(2018, 5, 14), 32.9],
                [Date.UTC(2018, 6,  19), 33],
                [Date.UTC(2018, 7, 9), 33.1],
            ]
          },
        {
                name: 'Закупки в Москве',
                color:'#2c9236',
                id:"3",
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
              }
    ]
}