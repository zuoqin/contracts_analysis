import { Component,ViewChild,OnInit } from '@angular/core';

/*Plugins*/
import {BsModalComponent } from 'ng2-bs3-modal';




@Component({
    selector:"sent-commercial-proposal-modal",
    templateUrl:"./sent-commercial-proposal-modal.component.html"
})
export class SentCommercialProposalModalComponent implements OnInit{
    @ViewChild('sentCommercialProposalModal')
    sentCommercialProposalModal: BsModalComponent;
    



    addSupplierDynamic: false;

 

    
    constructor(){}
    

    open(){
        
        this.sentCommercialProposalModal.open();
    }
    close(){
        this.sentCommercialProposalModal.close();
    }
    onClose(){
       
    }
    ngOnInit(){
     
    }
   
}