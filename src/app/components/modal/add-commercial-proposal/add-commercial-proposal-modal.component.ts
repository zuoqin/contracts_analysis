import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalComponent } from 'ng2-bs3-modal';

import { CONFIG } from '@config';

@Component({
    selector:"add-commercial-proposal-modal",
    templateUrl:"./add-commercial-proposal-modal.component.html"
})
export class AddCommercialProposalModalComponent implements OnInit{
    @ViewChild('addCommercialProposalModal')
    addCommercialProposalModal: BsModalComponent;
    addProposalForm: FormGroup;
    maskPhoneSettings = CONFIG.maskPhoneSettings;

    autocompleteProduct = CONFIG.autocompleteProduct
    autocompleteSupplier = CONFIG.autocompleteSupplier;

    numberMaskOptions = CONFIG.numberMaskOptions;
    numberDecimalMaskOptions = CONFIG.numberDecimalMaskOptions;

    
    volumeUnitPlaceholder:string;
    termUnitPlaceholder:string;

    suppliersArray = [];

    public volumeUnits = [
        {
            id:"1",
            name:"Кг",
            placeholder:"кг"
        },
        {
            id:"2",
            name:"Литр",
            placeholder:"литрах"
        },
        {
            id:"3",
            name:"Упаковка",
            placeholder:"упаковках"
        }
    ]
    public termUnits = [
        {
            id:"1",
            name:"Дни",
            placeholder:"днях"
        },
        {
            id:"2",
            name:"Недели",
            placeholder:"неделях"
        },
        {
            id:"3",
            name:"Месяцы",
            placeholder:"месяцах"
        }
    ]
    constructor(      
        private formBuilder: FormBuilder,
    ){

    }

    open(){
        this.addCommercialProposalModal.open();
    }
    onClose(){

        this.addProposalForm.reset();
        this.initForm()
    }
    ngOnInit(){
        this.initForm()
    }
    initForm(){
        this.addProposalForm = this.formBuilder.group({
            supplier: ['', [Validators.required]],
            type: ['product', [Validators.required]],
            product: ['', [Validators.required]],
            linkProduct: ['', [Validators.required]],
			price: ['', [Validators.required]],
            pricePerItem:['', [Validators.required]],
            volume:['', [Validators.required]],
            volumeUnit:['1', [Validators.required]],
            term:['', [Validators.required]],
            termUnit:['1', [Validators.required]],
            comment:[''],
            phone:[''],
            document:[null],
        });
        this.changeTermUnit()
        this.changeVolumeUnit()

        this.suppliersArray = [];
        this.addSupplier()

    }
    addSupplier(){
        this.suppliersArray.push(
            {
                id:null,
            }
         )
    }
    removeSupplier(supplier){
        this.suppliersArray.splice(this.suppliersArray.indexOf(supplier),1)
    }
    onBlurMaskPhone(){
		if(this.addProposalForm.controls['phone'].value.indexOf('_')>=0 || this.addProposalForm.controls['phone'].value.length==1){
			this.addProposalForm.controls['phone'].setValue('');
		}
	}
    changeType(value){
        console.log(value)
    }
    selectSupplier(value){
        console.log(value)
    }
    changeTermUnit(){
        this.termUnitPlaceholder = this.changeUnit(this.termUnits,'termUnit')
    }
    changeVolumeUnit(){
        this.volumeUnitPlaceholder = this.changeUnit(this.volumeUnits,'volumeUnit')
    }
    changeUnit(array,filed){
        let currentId = this.addProposalForm.controls[filed].value;
        let unit = array.filter(item => item.id==currentId)[0];
        return unit.placeholder
    }

    onFileChange($event) {
        let file = $event.target.files[0]; // <--- File Object for future use.
        this.addProposalForm.controls['document'].setValue(file ? file.name : ''); // <-- Set Value for Validation
        
    }
    removeFile(){
        this.addProposalForm.controls['document'].setValue(null);
    }
    openInput(){ 
        document.getElementById("document").click();
    }
    submit(){
        if (this.addProposalForm.invalid) {
            const controls = this.addProposalForm.controls;
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
                return;
        }

        console.log( this.addProposalForm)
    }
}