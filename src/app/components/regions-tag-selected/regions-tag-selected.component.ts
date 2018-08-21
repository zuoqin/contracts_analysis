import { Component,OnInit } from "@angular/core";
import { NgOption } from '@ng-select/ng-select';

@Component({
    selector:'regions-tag-selected',
    templateUrl:'./regions-tag-selected.component.html'
})

export class RegionsTagSelectedComponent implements OnInit{
    regionsSelectedModel:string;
    regionsSelected = [];
    regions: NgOption[] = [
        {
            name:"г. Москва", 
            id:"1"
        },
        {
            name:"ЦФО", 
            id:"2"
        },
        {
            name:"Вне ЦФО",
            id:"3"
        },
        {
            name:"Европейская часть России", 
            id:"4"
        },
        {
            name:"Республика Адыгея", 
            id:"5"
        },
        {
            name:"Республика Башкортостан", 
            id:"6"
        },
    ]


    ngOnInit() {
        this.regionsSelectedModel = this.regions[0].id;
        this.regionsSelected.push(this.regions[0])
    }
    changeRegions(event){
        let currentRegion = event.selectedValues[0];
        if(currentRegion){
            let currentSelected = this.regionsSelected.filter(region => region.id === currentRegion.id);
            if(currentSelected.length==0){
                this.regionsSelected.push(currentRegion);
            }
        }
    }
    deleteRegion(id:string){
        this.regionsSelected.splice(this.regionsSelected.findIndex(region => region.id === id),1);
        if(this.regionsSelected.length){
            let getCurrentIndex = this.regionsSelected.findIndex(region => region.id === this.regionsSelectedModel);
            if(getCurrentIndex<0){
                this.regionsSelectedModel = this.regionsSelected[this.regionsSelected.length-1].id
            }
        }else{
            this.regionsSelectedModel = null;
        }
        
    }
}