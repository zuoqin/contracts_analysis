import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*Plugins*/
import {BsModalComponent } from 'ng2-bs3-modal';




@Component({
    selector:"sending-commercial-proposal-modal",
    templateUrl:"./sending-commercial-proposal-modal.component.html"
})
export class SendingCPModalComponent implements OnInit{
    @ViewChild("ckeditor") ckeditor: any;
    @ViewChild('modal') modal:any;
    @ViewChild('sendingCommercialProposalModal')

    sendingCommercialProposalModal: BsModalComponent;
    commercialProposalForm: FormGroup;
    letterContent:string = "Введите текст";
    isShowPlaceholder:boolean = true;
    emailList = [
        'petroviv@pa.com',
        'ivanov@pa.com',
        'sidorov@pa.com'
    ]
    ckeConfig = {
        extraPlugins:'autogrow,divarea',
        autoGrow_onStartup: true,
        autoGrow_minHeight:100,
        autoGrow_maxHeight:600,
        forcePasteAsPlainText:true,
        language: "ru",
        allowedContent: true,
        linkShowAdvancedTab:false,
        removePlugins:'elementspath',
        placeholder:'some value',
        toolbar: [
            { name: "basicstyles", items: ["Bold", "Italic", "Underline", "-", "RemoveFormat", "-","NumberedList","BulletedList","-","Link", "Unlink"] },
      
        ],
    };


    constructor(
        private formBuilder: FormBuilder
    ){}
    

    open(){
        this.modal.element.nativeElement.removeAttribute("tabindex")
        this.sendingCommercialProposalModal.open();
    }
    close(){
        this.sendingCommercialProposalModal.close();
    }
    onClose(){
       
    }
    ngOnInit(){

        this.initForm();
    }

    onFocus(event){
        if(this.isShowPlaceholder){
            event.editor.setData('');
        }
        this.isShowPlaceholder = false; 
    }
    onBlur(event){
        if (!event.editor.getData().length) {
            this.isShowPlaceholder = true;
            event.editor.setData("Введите текст");
        } 
    }



    initForm(){
        this.commercialProposalForm = this.formBuilder.group({
            subject: ['', [Validators.required]],
            email:[{value:'molokovsem@gmail.com',disabled:true}, [Validators.required]],
            from: [this.emailList[0]],
            message:['', [Validators.required]],
        });
    }
    onEditorChange(event){
        if(this.isShowPlaceholder){
            this.commercialProposalForm.controls['message'].setValue('')
        }else{
            this.commercialProposalForm.controls['message'].setValue(event.editor.getData())
        }
        
    }
    submit(){
        if (this.commercialProposalForm.invalid) {
            const controls = this.commercialProposalForm.controls;
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
                return;
        }

        console.log(this.commercialProposalForm)
    }
}