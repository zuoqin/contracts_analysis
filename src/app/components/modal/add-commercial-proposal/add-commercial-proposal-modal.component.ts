import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

/*Services*/
import { SuppliersServices } from '@core';


import { CONFIG } from '@config';

@Component({
    selector:"add-commercial-proposal-modal",
    templateUrl:"./add-commercial-proposal-modal.component.html"
})
export class AddCommercialProposalModalComponent implements OnInit{
    @Input('noShowSupplier') noShowSupplier;
    @ViewChild('addCommercialProposalModal')
    addCommercialProposalModal: BsModalComponent;
    addProposalForm: FormGroup;
    maskPhoneSettings = CONFIG.maskPhoneSettings;

    autocompleteProduct = CONFIG.autocompleteProduct
    autocompleteSupplier = CONFIG.autocompleteSupplier;

    numberSpaceMaskOptions = CONFIG.numberSpaceMaskOptions;
    numberDecimalSpaceMaskOptions = CONFIG.numberDecimalSpaceMaskOptions;

    
    volumeUnitPlaceholder:string;
    termUnitPlaceholder:string;
    initialValueSupplier:string;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

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
        private suppliersServices:SuppliersServices
    ){
        this.suppliersServices.addDynamicSupplierObservable
            .takeUntil(this.ngUnsubscribe)
            .subscribe(value=>{
                this.initialValueSupplier = value;
                this.addProposalForm.controls['supplier'].setValue(value);
                this.open();
            })
        this.suppliersServices.openAddCPModalObservable
            .takeUntil(this.ngUnsubscribe)
            .subscribe(value=>{
                console.log(1)
                this.open();
            })
        
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
    ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
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
        if(this.noShowSupplier){
            this.addProposalForm.controls['supplier'].setValue('ООО «РегионПродукт»')
        }
       
   

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
    addSupplier(){
        this.addCommercialProposalModal.close();
        
        console.log('добавить поставщика')
        let that = this;
        setTimeout(()=>{
            that.suppliersServices.addSupplierFromModal.next(true);
        },600)
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
        console.log()
        if(file.size>1024*1024*100){
            alert('Максимальный размер файла 100 мб')
        }else{
            this.addProposalForm.controls['document'].setValue(file ? file.name : ''); // <-- Set Value for Validation
        }
   
        
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