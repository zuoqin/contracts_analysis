import { Component,ViewChild,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/*Services*/
import { SuppliersServices,ProductServices } from '@core';
/*Plugins*/
import { BsModalComponent } from 'ng2-bs3-modal';
import {IMyDpOptions} from 'mydatepicker';

import { CONFIG } from '@config';


@Component({
    selector:"add-supplier-modal",
    templateUrl:"./add-supplier-modal.component.html"
})
export class AddSupplierModalComponent implements OnInit{
    unsubscribeAll = new Subject();
    @ViewChild('addSupplierModal')
    addSupplierModal: BsModalComponent;
    addSupplierForm: FormGroup;
    autocompleteProduct = CONFIG.autocompleteProduct;
    autocompleteSPGZ = CONFIG.autocompleteSPGZ;
    maskPhoneSettings = CONFIG.maskPhoneSettings;
    numberMaskOptions = CONFIG.numberMaskOptions;
    numberDecimalSpaceMaskOptions = CONFIG.numberDecimalSpaceMaskOptions;
    isEditDisabled:boolean = true;
    volumeUnitPlaceholder:string;
    ifLoadInn:boolean = false;
    lastLoadedInn:number;
    ifCheckInn:boolean = false;
    supplierInfo;
    isSupplierExists:boolean = false;

    ifSendSuccess:boolean = false;
    ifSubmit:boolean = false;
    attrsProduct;
    selectedAttrs = [];
    units = [];
    selectedProductKpgz;

    ifDisabledProduct:boolean = false;
    private currentDate = null;

    addSupplierDynamic: false;
    myDatePickerOptions: IMyDpOptions = {
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

    answerMessage = {
        text:null,
        sucess:"Поставщик успешно добавлен",
        error:"Ошибка, попробуйте позже"
    }
    

    
    constructor(      
        private formBuilder: FormBuilder,
        private suppliersServices:SuppliersServices,
        private productServices:ProductServices
    ){
        this.suppliersServices.addSupplierFromModalObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(value=>{
                this.addSupplierDynamic = value;
                this.open();
            })
    }

    open(){
        this.resetForm();
        this.ifSubmit = false;
        this.ifSendSuccess = false;
        this.ifCheckInn = false;
        this.answerMessage.text = null;
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
        this.initCurrentDay();
        this.initDisabledDate();
    }

    changeType(value){
        this.resetForm()
    }
    resetForm(){
        this.units = [];
        this.attrsProduct = null;
        this.selectedAttrs = [];
        this.addSupplierForm.controls['product'].setValue(null);
    }
    initForm(){
        this.addSupplierForm = this.formBuilder.group({
            switchEdit:[false],
            supplier_type: ['producer', [Validators.required]],
            inn: ['', [Validators.required]],//инн
            kpp: ['', [Validators.required]],//кпп
            name: [{value:'',disabled:true}, [Validators.required]],
			addres: [{value:'',disabled:true}, [Validators.required]],
            site:[{value:'',disabled:true}],
            email:[{value:'',disabled:true}, [Validators.required]],
            phone:[{value:'',disabled:true}, [Validators.required]],
            dataRegistration:[{value:null,disabled:true}, [Validators.required]],
            year_value:['', [Validators.required]],
            scale:['1', [Validators.required]],
            product:[null, [Validators.required]],
            has_warehouse :[false],
            spgz_id:[],
            typeProduct:['spgz', [Validators.required]],
            value:['', [Validators.required]],
            price_per_unit:['', [Validators.required]],
            unit_id:[null, [Validators.required]],
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
        this.isEditDisabled = !event;
        const state = this.isEditDisabled ? 'disable' : 'enable';

        this.addSupplierForm.controls['name'][state]();
        this.addSupplierForm.controls['addres'][state]();
        this.addSupplierForm.controls['site'][state]();
        this.addSupplierForm.controls['email'][state]();
        this.addSupplierForm.controls['phone'][state]();
        this.addSupplierForm.controls['dataRegistration'][state]();
    }
    changeVolumeUnit(){
        this.volumeUnitPlaceholder = this.changeUnit(this.units,'unit_id')
    }
    changeUnit(array,filed){
        let currentId = this.addSupplierForm.controls[filed].value;
        let unit = array.filter(item => item.unit_id==currentId)[0];
        return unit.abbreviation
    }
    onBulrInn(){
        if(this.addSupplierForm.controls['inn'].value.length<5){
            return;
        }
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
                 
                    
                    if(response.result && !response.data.inn_exists){
                        this.isSupplierExists = false;
                        this.supplierInfo = response.data;
                        this.addSupplierForm.controls['kpp'].setValue(this.supplierInfo.kpp)
                        this.addSupplierForm.controls['name'].setValue(this.supplierInfo.name)
                        if(this.supplierInfo.address && this.supplierInfo.address.full){
                            this.addSupplierForm.controls['addres'].setValue(this.supplierInfo.address.full);
                        }else{
                            if(this.supplierInfo.address && this.supplierInfo.address.length){
                                this.addSupplierForm.controls['addres'].setValue(this.supplierInfo.address);
                            }
                        }
                   
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
                        }
                        this.addSupplierForm.controls['dataRegistration'].setValue(date);
                    }else{
                        this.supplierInfo = [];
                        this.addSupplierForm.controls['kpp'].setValue(null)
                        this.addSupplierForm.controls['name'].setValue(null);
                        this.addSupplierForm.controls['addres'].setValue(null);
                        this.addSupplierForm.controls['site'].setValue(null);
                        this.addSupplierForm.controls['email'].setValue(null);
                        this.addSupplierForm.controls['phone'].setValue(null);
                        if(response.data.inn_exists){
                            this.isSupplierExists = true;
                        }

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
    selectProduct(event){
        this.addSupplierForm.controls['product'].setValue(event)
        this.selectedProductKpgz = event.kpgz_id;
        this.getUnits();
        this.getAttrs();
        this.getSpgz();
    }
    selectProductSpgz(event){
        this.addSupplierForm.controls['product'].setValue(event)
        this.selectedProductKpgz = event.kpgz_id;
        this.getUnits();
        this.addSupplierForm.controls['spgz_id'].setValue(event.spgz_id)
    }
    getAttrs(){
        this.productServices.getAttrs(this.selectedProductKpgz).subscribe(
            response => {
                this.attrsProduct = response.data;
            },
            err => {
                console.log(err)
            }
        );
    }
    getSpgz(atrr?){
        return this.productServices.getSpgz(this.selectedProductKpgz,atrr).subscribe(
            response => {
                this.addSupplierForm.controls['spgz_id'].setValue(response.data)
                if(!response.data.length){
                    this.ifDisabledProduct = true;
                }else{
                    this.ifDisabledProduct = false;
                }
                
            },
            err => {
                console.log(err)
            }
        );
    }
    getUnits(){
        this.productServices.getUnits(this.selectedProductKpgz).subscribe(
            response => {
                if(response.data.length){
                    this.units = response.data;
                    this.ifDisabledProduct = false;
                    this.addSupplierForm.controls['unit_id'].setValue(this.units[0].unit_id);
                    this.changeVolumeUnit()

                }else{
                    this.units = [];
                    this.ifDisabledProduct = true;
                    this.addSupplierForm.controls['unit_id'].setValue('')
                }
            },
            err => {
                console.log(err)
            }
        );
    }
    selectAttr(event,attr){
        if(event.target.checked){
            this.selectedAttrs.push(attr)
        }else{
            let index = this.selectedAttrs.indexOf(attr);
            if(index>=0){
                this.selectedAttrs.splice(index, 1);
            }
        }
        if(this.selectedAttrs.length){
            let arrayAttr = [];
            this.selectedAttrs.map(item=>arrayAttr.push(item.value_id))
            this.getSpgz(arrayAttr)
        }else{
            this.getSpgz()
        }
   
    }
    submit(){
   
        if(this.ifDisabledProduct || this.ifSubmit || this.isSupplierExists){
            return;
        }
        if(
            this.ifCheckInn &&
            (!this.addSupplierForm.controls['dataRegistration'].value ||
            !this.addSupplierForm.controls['kpp'].value ||
            !this.addSupplierForm.controls['name'].value ||
            !this.addSupplierForm.controls['addres'].value ||
            !this.addSupplierForm.controls['phone'].value ||
            !this.addSupplierForm.controls['email'].value ||
            !this.addSupplierForm.controls['dataRegistration'].value)
        ){
            this.addSupplierForm.controls['switchEdit'].setValue(true)
            this.changeEdit(true);
        }
        if (this.addSupplierForm.invalid) {
            const controls = this.addSupplierForm.controls;
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
                return;
        }
  
  
        let reg_date = this.formatDate(this.addSupplierForm.controls['dataRegistration'].value.date);
        let body = {
            supplier_type:this.addSupplierForm.value.supplier_type,//текст, только 'producer' или 'provider'
            inn:this.addSupplierForm.value.inn,
            kpp:this.addSupplierForm.value.kpp,
            name:this.addSupplierForm.controls['name'].value,
            address:this.addSupplierForm.controls['addres'].value,
            site:this.addSupplierForm.controls['site'].value,
            email:this.addSupplierForm.controls['email'].value,
            phone:this.addSupplierForm.controls['phone'].value,
            reg_date:reg_date,
            year_value:parseFloat(this.addSupplierForm.value.year_value.replace(/ /g,"")),
            scale:this.addSupplierForm.value.scale,
            has_warehouse:this.addSupplierForm.value.has_warehouse.toString(),
            spgz_id:this.addSupplierForm.value.spgz_id,
            value:parseFloat(this.addSupplierForm.value.value.replace(/ /g,"")),
            price_per_unit:parseFloat(this.addSupplierForm.value.price_per_unit.replace(/ /g,"")),
            unit_id:this.addSupplierForm.value.unit_id
        }



        this.suppliersServices.addSupplier(body)
            .subscribe(
                response => {
                    if(this.addSupplierDynamic){
                        this.suppliersServices.addDynamicSupplier.next({
                            supplier_id:response.data.info.supplier_id,
                            name:this.addSupplierForm.controls['name'].value
                        });
                        this.close()
                        this.addSupplierDynamic = false;
                    }

                    this.ifSubmit = false;
                    this.ifSendSuccess = true;
                    this.addSupplierForm.reset();
                    this.answerMessage.text = this.answerMessage.sucess;
                },
                err => {
                    this.ifSubmit = false;
                    this.answerMessage.text = this.answerMessage.error;
                    console.log(err)
                }
            );
    }
    formatDate(date){
        return `${("0" + date.day).slice(-2)}/${("0" + date.month).slice(-2)}/${date.year}`;
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}