import { Component,OnInit, Input,Output,EventEmitter } from "@angular/core";
import { NgOption } from '@ng-select/ng-select';

@Component({
    selector:'regions-tag-selected',
    templateUrl:'./regions-tag-selected.component.html'
})

export class RegionsTagSelectedComponent implements OnInit{
    regionsSelectedModel:string;
    regionsSelected = [];
    @Input('regions') regions: NgOption[];
    @Output() onSelected = new EventEmitter<any>();
    ngOnInit() {
        // this.regionsSelectedModel = this.regions[0].id;
        // this.regionsSelected.push(this.regions[0])
        // this.onSelected.emit(this.regionsSelected)
    }
    changeRegions(event){
        let currentRegion = event.selectedValues[0];
        if(currentRegion){
            let currentSelected = this.regionsSelected.filter(region => region.id === currentRegion.id);
            if(currentSelected.length==0){
                this.regionsSelected.push(currentRegion);
            }
        }
        this.onSelected.emit(this.regionsSelected)
    }
    deleteRegion(id:string){
        this.regionsSelected.splice(this.regionsSelected.findIndex(region => region.id === id),1);
        if(this.regionsSelected.length){
            let getCurrentIndex = this.regionsSelected.findIndex(region => region.id === this.regionsSelectedModel);
            if(getCurrentIndex<0){
                this.regionsSelectedModel = this.regionsSelected[this.regionsSelected.length-1].id
            }
            this.onSelected.emit(this.regionsSelected)
        }else{
            this.onSelected.emit(false)
            this.regionsSelectedModel = null;
        }
        
    }
}