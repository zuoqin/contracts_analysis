import { Injectable } from '@angular/core';

@Injectable()
export class FilterServices{

  
    findMinMaxDate(data,field,type){
        let dates=[];
        data.map(item=>{
        
       
                Object.keys(item).forEach(function (key) {
                    if(key==field && item[key]){
                        dates.push(item[key].value)
                    }
                 });
            
          
        })
        if(type=="min"){
            return new Date(Math.min.apply(null,dates));
        }else{
            return new Date(Math.max.apply(null,dates));
        } 
    }
    findMinMax(data,field,type){
        let array=[];
        data.map(item=>{
            Object.keys(item).forEach(function (key) {
                if(key==field){
                    array.push(item[key])
                }
             });
        })
  
        if(type=="min"){
            return  Math.min.apply(null, array);
        }else{
            return Math.max.apply(null, array);
        }
    }
  
    findAllDiffValue(data,field){
        let array=[];
        let arrayDiff=[];
        data.map(item=>{
            Object.keys(item).forEach(function (key) {
                if(key==field){
                    array.push(item[key])
                }
             });
        })
        array.map(item=>{
            if(arrayDiff.indexOf(item)<0){
                arrayDiff.push(item)
            }
        })
   
        return arrayDiff;
    
    }
    
}