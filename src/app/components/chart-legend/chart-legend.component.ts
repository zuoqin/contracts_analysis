import { Component, OnInit,Input, Output,EventEmitter,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';

import { ProductServices } from '@core';
@Component({
	selector: 'chart-legend',
	templateUrl: './chart-legend.component.html',
	styleUrls: ['./chart-legend.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ChartLegendComponent implements OnInit {
	priceChartLegendForm: FormGroup;
	@Input('legendData') legendData;
	@Output() onChanged = new EventEmitter<any>();
	constructor(
        private formBuilder: FormBuilder,
        private productServices:ProductServices
        ){

   
		}
		

		  
		
		ngOnInit(){

			if(this.legendData){
				
				this.priceChartLegendForm = this.createGroup(this.legendData);
				console.log(this.priceChartLegendForm)
				this.onChangeLegend();
			}

		}
		createGroup(data) {
			const group = this.formBuilder.group({});

			data.forEach(control => group.addControl(control.id, new FormControl(control.value)));
			return group;
		}
		onChangeLegend(data?){
		
	
			if(data){
				data.value = this.priceChartLegendForm.controls[data.id].value;
			}
			let activeGraphs = [];
			for(let control in this.priceChartLegendForm.controls) {
				let id = control;
				let value = this.priceChartLegendForm.controls[control].value;
	
				if(value){
					activeGraphs.push(id)
				   
				}
			}
			this.selectActiveGraph(activeGraphs)
		 
		}
		selectActiveGraph(activeGraphs){
			let activeGraphDataArray = [];
	
			activeGraphs.map(graph=>{
				activeGraphDataArray.push(this.legendData.filter(data=>data.id==graph)[0])
			})

			this.onChanged.emit(activeGraphDataArray)

		}
}
