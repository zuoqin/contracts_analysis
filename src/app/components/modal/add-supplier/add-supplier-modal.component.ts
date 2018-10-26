import { Component,ViewChild,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

/*Services*/
import { SuppliersServices } from '@core';

/*Plugins*/
import { BsModalComponent } from 'ng2-bs3-modal';
import {IMyDpOptions} from 'mydatepicker';

import { CONFIG } from '@config';


@Component({
    selector:"add-supplier-modal",
    templateUrl:"./add-supplier-modal.component.html"
})
export class AddSupplierModalComponent implements OnInit{
    @ViewChild('addSupplierModal')
    addSupplierModal: BsModalComponent;
    addSupplierForm: FormGroup;
    autocompleteProduct = CONFIG.autocompleteProduct;
    maskPhoneSettings = CONFIG.maskPhoneSettings;
    numberMaskOptions = CONFIG.numberMaskOptions;
    numberDecimalSpaceMaskOptions = CONFIG.numberDecimalSpaceMaskOptions;
    isEditDisabled:boolean = true;
    volumeUnitPlaceholder:string;
    ifLoadInn:boolean = false;
    lastLoadedInn:number;
    ifCheckInn:boolean = false;
    supplierInfo;
    private currentDate = null;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    addSupplierDynamic: false;
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        disableSince: {year: 0, month: 0, day: 0},
        dayLabels:CONFIG.dayLabels,
        monthLabels:CONFIG.monthLabels,
        yearSelector:false,
        editableDateField:false,
        showTodayBtn:false,
        openSelectorOnInputClick:true
    };
   
    // Initialized to specific date (09.10.2018).
    public model: any = { date: { year: 2018, month: 10, day: 9 } };


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

    
    constructor(      
        private formBuilder: FormBuilder,
        private suppliersServices:SuppliersServices
    ){
        this.suppliersServices.addSupplierFromModalObservable
            .takeUntil(this.ngUnsubscribe)
            .subscribe(value=>{
                this.addSupplierDynamic = value;
                this.open();
            })
    }
    

    open(){
        this.ifCheckInn = false;
        this.addSupplierModal.open();
    }
    close(){
        this.addSupplierModal.close();
    }
    onClose(){
        this.addSupplierForm.reset();
        this.initForm()
    }
    ngOnInit(){
        this.initForm();
        this.changeVolumeUnit();
        this.initCurrentDay();
        this.initDisabledDate();
    }
    ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
    changeType(value){
        console.log(value)
    }

    initForm(){
        this.addSupplierForm = this.formBuilder.group({
            typeSupplier: ['1', [Validators.required]],
            inn: ['', [Validators.required]],//инн
            kpp: ['', [Validators.required]],//кпп
            name: [{value:'',disabled:true}, [Validators.required]],
			addres: [{value:'',disabled:true}, [Validators.required]],
            site:[{value:'',disabled:true}],
            email:[{value:'',disabled:true}, [Validators.required]],
            phone:[{value:'',disabled:true}, [Validators.required]],
            dataRegistration:[{value:null,disabled:true}, [Validators.required]],
            turnover:['', [Validators.required]],
            scale:['1', [Validators.required]],
            stock:[false],
            typeProduct:['product', [Validators.required]],
            product: ['', [Validators.required]],
            volume:['', [Validators.required]],
            pricePerItem:['', [Validators.required]],
            volumeUnit:['1', [Validators.required]],
        });


        
    }
    setDate(): void {
        // Set today date using the patchValue function
        let date = new Date();
        this.addSupplierForm.patchValue({dataRegistration: {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()}
        }});
    }
    clearDate(): void {
        // Clear the date using the patchValue function
        this.addSupplierForm.patchValue({myDate: null});
    }

    onBlurMaskPhone(){
		if(this.addSupplierForm.controls['phone'].value.indexOf('_')>=0 || this.addSupplierForm.controls['phone'].value.length==1){
			this.addSupplierForm.controls['phone'].setValue('');
		}
	}
    changeEdit(event){
        this.isEditDisabled = !event.target.checked;
        const state = this.isEditDisabled ? 'disable' : 'enable';

        this.addSupplierForm.controls['name'][state]();
        this.addSupplierForm.controls['addres'][state]();
        this.addSupplierForm.controls['site'][state]();
        this.addSupplierForm.controls['email'][state]();
        this.addSupplierForm.controls['phone'][state]();
        this.addSupplierForm.controls['dataRegistration'][state]();
    }
    changeVolumeUnit(){
        this.volumeUnitPlaceholder = this.changeUnit(this.volumeUnits,'volumeUnit')
    }
    changeUnit(array,filed){
        let currentId = this.addSupplierForm.controls[filed].value;
        let unit = array.filter(item => item.id==currentId)[0];
        return unit.placeholder
    }
    onBulrInn(){
        if(this.lastLoadedInn && this.lastLoadedInn==this.addSupplierForm.controls['inn'].value){
            return;
        }
        this.ifLoadInn = true;
  
        this.lastLoadedInn = this.addSupplierForm.controls['inn'].value;
        this.suppliersServices
            .getCompanyInfo(this.addSupplierForm.controls['inn'].value)
            .subscribe(
                response => {
                    this.ifCheckInn = true;
                    this.ifLoadInn = false;
                    if(response.result){
                        this.supplierInfo = response.data;
                        this.addSupplierForm.controls['kpp'].setValue(this.supplierInfo.kpp)
                        this.addSupplierForm.controls['name'].setValue(this.supplierInfo.name)
               
                        this.addSupplierForm.controls['addres'].setValue(this.supplierInfo.address);
                        this.addSupplierForm.controls['site'].setValue(this.supplierInfo.site);
                        this.addSupplierForm.controls['email'].setValue(this.supplierInfo.email);
                        this.addSupplierForm.controls['phone'].setValue(this.supplierInfo.phones[0]);
                        let date;
                        if(this.supplierInfo.regdate){
                      
                            let regDate =  this.supplierInfo.regdate.split('-')
                            date ={
                                    date:{
                                        year: parseInt(regDate[0]),
                                        month: parseInt(regDate[1]), 
                                        day: parseInt(regDate[2])
                                    }
                                }
                            console.log(regDate)
                            console.log(date)
                        }
                        this.addSupplierForm.controls['dataRegistration'].setValue(date);
                    }else{
                        if(response.data.error){
                            console.log(response.data.error)
                        }
                    }
                    
                 

                    

                },
                err => {
                    this.ifCheckInn = true;
                    this.ifLoadInn = false;
                console.log(err)
                }
            );



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
        this.myDatePickerOptions = copy;
    }
    getCopyOfOptions(): IMyDpOptions {
		return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    }

    submit(){
        if(this.addSupplierDynamic){
            this.close()
            let supplier = this.addSupplierForm.controls['name'].value
            let that = this;
            setTimeout(()=>{
                that.suppliersServices.addDynamicSupplier.next(supplier);
            },600)
            this.addSupplierDynamic = false;
         
        }
        // if (this.addSupplierForm.invalid) {
        //     const controls = this.addSupplierForm.controls;
        //     Object.keys(controls)
        //         .forEach(controlName => controls[controlName].markAsTouched());
        //         return;
        // }

        console.log( this.addSupplierForm)
    }
}