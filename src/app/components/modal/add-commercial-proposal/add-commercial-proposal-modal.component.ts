import { Component, ViewChild, OnInit, Input, } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/*Services*/
import { SuppliersServices } from '@core';
import { ProductServices } from '@core';
/*Models*/
import { ProductSearch } from '@core';

import { CONFIG } from '@config';

@Component({
    selector:"add-commercial-proposal-modal",
    templateUrl:"./add-commercial-proposal-modal.component.html"
})
export class AddCommercialProposalModalComponent implements OnInit{
    unsubscribeAll = new Subject();
    @Input('supplierInfo') supplierInfo;
    @ViewChild('addCommercialProposalModal')
    addCommercialProposalModal: BsModalComponent;
    addProposalForm: FormGroup;
    attrsProduct = []
    
    maskPhoneSettings = CONFIG.maskPhoneSettings;

    autocompleteSPGZ = CONFIG.autocompleteSPGZ
    autocompleteSupplier = CONFIG.autocompleteSupplier;

    numberSpaceMaskOptions = CONFIG.numberSpaceMaskOptions;
    numberDecimalSpaceMaskOptions = CONFIG.numberDecimalSpaceMaskOptions;

    selectedProduct:ProductSearch;
    volumeUnitPlaceholder:string = '';
    termUnitPlaceholder:string;
    initialValueSupplier;
    ifSendSuccess:boolean = false;
    ifSubmit:boolean = false;

 
    ifDisabledProduct:boolean = false;
    answerMessage = {
        text:null,
        sucess:"Коммерческое предложение успешно добавлено",
        error:"Ошибка, попробуйте позже"
    }

     public volumeUnits; //= [
    //     {
    //         id:"1",
    //         name:"Кг",
    //         placeholder:"кг"
    //     },
    //     {
    //         id:"2",
    //         name:"Литр",
    //         placeholder:"литрах"
    //     },
    //     {
    //         id:"3",
    //         name:"Упаковка",
    //         placeholder:"упаковках"
    //     }
    // ]
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
        private suppliersServices:SuppliersServices,
        private productServices:ProductServices
    ){
        this.suppliersServices.addDynamicSupplierObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(value=>{
                this.initialValueSupplier = value;

                this.addProposalForm.controls['supplierName'].setValue(this.initialValueSupplier.name)
                this.addProposalForm.controls['supplier'].setValue(this.initialValueSupplier.supplier_id)
                this.open();
            })
        this.suppliersServices.openAddCPModalObservable
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(value=>{
                this.open();
            })

        this.productServices.SelectProductObservable
            .subscribe((selectedProduct)=>{
        
                this.selectedProduct = selectedProduct;
      
            })
    }

    open(){
        this.ifSubmit = false;
        this.ifSendSuccess = false;
        this.answerMessage.text = null;
        this.addCommercialProposalModal.open();
    }
    onClose(){

        this.addProposalForm.reset();
        this.initForm()
    }
    close(){
        this.addCommercialProposalModal.close();
    }
    ngOnInit(){
        this.initForm()
    }
 
    initForm(){
        this.addProposalForm = this.formBuilder.group({
            supplierName: [''],
            supplier: ['', [Validators.required]],
            type: ['product', [Validators.required]],
            product: ['', [Validators.required]],
            url: ['', [Validators.required]],
			priceAll: [''],
            price:['', [Validators.required]],
            volume:['', [Validators.required]],
            unit_id:[null, [Validators.required]],
            delivery:['', [Validators.required]],
            termUnit:['1', [Validators.required]],
            comment:[''],
            phone:['', [Validators.required]],
            document:[null],
        });


        this.changeTermUnit()
        //this.changeVolumeUnit()
    
        if(this.supplierInfo){
          
            this.addProposalForm.controls['supplierName'].setValue(this.supplierInfo.name)
            this.addProposalForm.controls['supplier'].setValue(this.supplierInfo.supplier_id)
            this.selectSupplier(this.supplierInfo)
            //
        }
       
   

    }


    onBlurMaskPhone(){
		if(this.addProposalForm.controls['phone'].value.indexOf('_')>=0 || this.addProposalForm.controls['phone'].value.length==1){
			this.addProposalForm.controls['phone'].setValue('');
		}
	}
    changeType(value){

    }
    selectSupplier(value){
        this.addProposalForm.controls['supplier'].setValue(value.supplier_id)
    }
    selectProduct(value){
       
        this.addProposalForm.controls['product'].setValue(value.spgz_id);
        /*Решили пока убрать поиск по продукту */
        //this.getAttrs(value.kpgz_id);

        this.getUnits(value.kpgz_id)
    }
    getUnits(kpgz_id){
        this.productServices.getUnits(kpgz_id).subscribe(
            response => {
                if(response.data.length){
                    this.volumeUnits = response.data;
                    this.ifDisabledProduct = false;
                    this.addProposalForm.controls['unit_id'].setValue(this.volumeUnits[0].unit_id);
                    this.changeVolumeUnit()
                }else{
                    this.ifDisabledProduct = true;
                   
                    this.volumeUnits = null;
                    this.addProposalForm.controls['product'].setValue('')
                    this.addProposalForm.controls['unit_id'].setValue('')
                }
            },
            err => {
                console.log(err)
            }
        );
    }
    /*Решили пока убрать поиск по продукту */
    // getAttrs(productId){
    //     this.productServices.getAttrs(productId).subscribe(
    //         response => {
    //             if(response.data.length){
    //                 this.attrsProduct = response.data;
    //             }
                
    //         },
    //         err => {
    //             console.log(err)
    //         }
    //     );
    // }
    addSupplier(){
        this.addCommercialProposalModal.close();
        let that = this;
        setTimeout(()=>{
            that.suppliersServices.addSupplierFromModal.next(true);
        },600)
    }
    changeTermUnit(){
        let currentId = this.addProposalForm.controls['termUnit'].value;
        let unit = this.termUnits.filter(item => item.id==currentId)[0];
        this.termUnitPlaceholder = 'В '+unit.placeholder
    }
    changeVolumeUnit(){

        let currentId = this.addProposalForm.controls['unit_id'].value;
        let unit = this.volumeUnits.filter(item => item.unit_id==currentId)[0];
        this.volumeUnitPlaceholder = 'В '+unit.abbreviation
    }

    onFileChange($event) {
        let file = $event.target.files[0];
        if(file.size>1024*1024*100){
            alert('Максимальный размер файла 100 мб')
        }else{
            this.addProposalForm.controls['document'].setValue(file ? file.name : ''); // <-- Set Value for Validation
        }
   
        
    }
    calcAllPrice(){

        let price = parseFloat(this.addProposalForm.value.price.replace(/ /g,""))
        let volume = parseFloat(this.addProposalForm.value.volume.replace(/ /g,""))

        if(price && volume){
            this.addProposalForm.controls['priceAll'].setValue(price*volume)
        }else{
            this.addProposalForm.controls['priceAll'].setValue(null)
        }
    }
    removeFile(){
        this.addProposalForm.controls['document'].setValue(null);
    }
    openInput(){ 
        document.getElementById("document").click();
    }
    submit(){
        this.answerMessage.text = null;
        if(this.ifDisabledProduct || this.ifSubmit){
            return;
        }
 

        if (this.addProposalForm.invalid) {
            const controls = this.addProposalForm.controls;
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
                return;
        }
        this.ifSubmit = true;
        let currentTermUnitId = this.addProposalForm.controls['termUnit'].value;
        let termUnit = this.termUnits.filter(item => item.id==currentTermUnitId)[0].name;

        
        let body = {
            comment:  this.addProposalForm.value.comment,
            delivery: this.addProposalForm.value.delivery.replace(/ /g,"")+' '+termUnit,
            phone: this.addProposalForm.value.phone,
            price: parseFloat(this.addProposalForm.value.price.replace(/ /g,"")),
            product: parseInt(this.addProposalForm.value.product),
            supplier: parseInt(this.addProposalForm.value.supplier),
            unit_id: parseInt(this.addProposalForm.value.unit_id),
            url: this.addProposalForm.value.url,
            volume: parseFloat(this.addProposalForm.value.volume.replace(/ /g,""))
        }

    
        this.productServices.addCommercialOffer(body)
            .subscribe(
                response => {
                    this.ifSubmit = false;
                    this.ifSendSuccess = true;
                    this.addProposalForm.reset();
                    this.answerMessage.text = this.answerMessage.sucess;
                },
                err => {
                    this.ifSubmit = false;
                    this.answerMessage.text = this.answerMessage.error;
                    console.log(err)
                }
            );
    }
    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}