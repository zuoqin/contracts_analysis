import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*Plugins*/
import {BsModalComponent } from 'ng2-bs3-modal';

/*Services*/
import { SuppliersServices,UserServices } from '@core';


@Component({
    selector:"sending-commercial-proposal-modal",
    templateUrl:"./sending-commercial-proposal-modal.component.html"
})
export class SendingCPModalComponent implements OnInit{
    @ViewChild("ckeditor") ckeditor: any;
    @ViewChild('modal') modal:any;
    @ViewChild('sendingCommercialProposalModal') sendingCommercialProposalModal: BsModalComponent;
    commercialProposalForm: FormGroup;
    letterContent:string = "Введите текст";
    isShowPlaceholder:boolean = true;
    emailManagerList;
    offerLineId;
    emailTo;
    messageAfterSubmit;
    ifSucessSubmit:boolean = false;
    attach_form:boolean = false;
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
        private suppliersServices:SuppliersServices,
        private formBuilder: FormBuilder,
        private userServices:UserServices
    ){
        this.emailManagerList =  this.userServices.managerUserEmailList;
    }
    

    open(offerLineId,emailTo?){
        this.messageAfterSubmit = '';
        this.ifSucessSubmit = false;
        this.emailTo = emailTo;
        this.offerLineId = offerLineId;
        this.reset()
        this.modal.element.nativeElement.removeAttribute("tabindex")
        this.sendingCommercialProposalModal.open();
    }
    close(){
        this.sendingCommercialProposalModal.close();
    }
    reset(){
        this.commercialProposalForm.reset()
        this.commercialProposalForm.controls['email'].setValue(this.emailTo);
        this.commercialProposalForm.controls['offer_line_id'].setValue(this.offerLineId)
        this.commercialProposalForm.controls['from'].setValue(this.emailManagerList[0].user)
        
    
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
            topic: ['', [Validators.required]],
            email:['', [Validators.required]],
            from: [null],
            content:['', [Validators.required]],
            offer_line_id:[null],
            attach_form:[false]
        });
    }
    onEditorChange(event){
        if(this.isShowPlaceholder){
            this.commercialProposalForm.controls['content'].setValue('')
        }else{
            this.commercialProposalForm.controls['content'].setValue(event.editor.getData())
        }
        
    }
    submit(){

        this.ifSucessSubmit = false;
        this.messageAfterSubmit = null;
        if (this.commercialProposalForm.invalid) {
            const controls = this.commercialProposalForm.controls;
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
                return;
        }
        let FromEmailId = this.emailManagerList.filter(item=>item.user==this.commercialProposalForm.value.from)[0].id;
        let body = {
            offer_line_id:this.commercialProposalForm.value.offer_line_id,
            outbox_id:FromEmailId,
            email:this.commercialProposalForm.value.email,
            content:this.commercialProposalForm.value.content,
            topic:this.commercialProposalForm.value.topic,
            attach_form:this.attach_form,
        };
        this.userServices.sendCpEmail(body).subscribe(
            response => {
                this.messageAfterSubmit = 'Коммерческое предложение отправлено';
                this.ifSucessSubmit = true;
                setTimeout(() => {
                    this.close()
                }, 2000);
              
            },
            err => {
                this.ifSucessSubmit = false;
                this.messageAfterSubmit = 'Ошибка, попробуйте позже';
                console.log(err)
            }
        );
    }

    openAddCPModal(){
        this.close()
        setTimeout(() => {
            this.suppliersServices.openAddCPModal.next(true)
        }, 300);
       
        
    }
}
