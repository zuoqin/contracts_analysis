import { Component,OnInit,EventEmitter,Output } from '@angular/core';
import {IMyDrpOptions,IMyDateRangeModel} from 'mydaterangepicker';
import { CONFIG } from '@config';

@Component({
    selector:"date-range-filter",
    templateUrl:"./date-range-filter.component.html",
    styleUrls:["./date-range-filter.component.scss"]
})
export class DateRangeFilterComponent implements OnInit{
    myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd.mm.yyyy',
        inline:true,
        disableSince: {year: 0, month: 0, day: 0},
        dayLabels:CONFIG.dayLabels,
        monthLabels:CONFIG.monthLabels,
        yearSelector:false,
        showSelectDateText:false
        
    };
    @Output() 
    onSelectedDate: EventEmitter<any> = new EventEmitter<any>();




    private currentDate = null;
    beginDate = null;
    endDate =null;
    dateRangeModel =null;


    ngOnInit(){
        this.initCurrentDay()
        this.initDisabledDate()
    }
   
  
    onDateSelected(event) {
        if(event.type==1){
            /*selected begin date*/
            this.beginDate = {
                day:event.date.day,
                month:event.date.month,
                year:event.date.year,
                formatted:`${event.date.day} ${CONFIG.shortMonths[event.date.month-1]} ${event.date.year} `
            };
        }else{
            this.endDate = {
                day:event.date.day,
                month:event.date.month,
                year:event.date.year,
                formatted:`${event.date.day} ${CONFIG.shortMonths[event.date.month-1]} ${event.date.year} `
            };
             /*selected end date*/
        }
      
    }
    onDateRangeChanged(event?: IMyDateRangeModel) {
        this.dateRangeModel = {
            beginDate:event.beginDate,
            endDate:event.endDate
        };
    }	
    selectNewDate(){
        this.beginDate = null;
        this.endDate =null;
        this.dateRangeModel = null;
    }
    initCurrentDay(){
        let date = new Date();
        this.currentDate = {
            day:date.getDate(),
            month:date.getMonth()+1,
            year:date.getFullYear(),
        };
    }
    initDisabledDate(){
        let copy = this.getCopyOfOptions();
        copy.disableSince = {
			year:this.currentDate.year,
			month:this.currentDate.month,
			day:this.currentDate.day+1
        };
        this.myDateRangePickerOptions = copy;
    }

    getCopyOfOptions(): IMyDrpOptions {
		return JSON.parse(JSON.stringify(this.myDateRangePickerOptions));
    }
    clear(event){
        this.close(event)
        this.beginDate = null;
        this.endDate =null;
        this.dateRangeModel = null;
        this.onSelectedDate.emit(this.dateRangeModel)
    }
    save(event){
        this.close(event)
        this.onSelectedDate.emit(this.dateRangeModel)
    }
    close(event){
        event.target.closest(".popup-form").classList.remove("active")
    }

}