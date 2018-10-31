import { Component,ViewChild,OnInit } from '@angular/core';

/*Plugins*/
import {BsModalComponent } from 'ng2-bs3-modal';


/*Services*/
import { SuppliersServices,ProductServices } from '@core';

@Component({
    selector:"sent-commercial-proposal-modal",
    templateUrl:"./sent-commercial-proposal-modal.component.html"
})
export class SentCommercialProposalModalComponent implements OnInit{
    @ViewChild('sentCommercialProposalModal')
    sentCommercialProposalModal: BsModalComponent;
    ifLoadData:boolean = false;
    sentCP; 


 

    
    constructor(
        private suppliersServices:SuppliersServices
    ){}
    

    open(supplier_id,offer_line_id?){
        this.ifLoadData = false;
        if(offer_line_id){
            this.suppliersServices.getCommercialOfferSent(offer_line_id).subscribe(
                response => {
                    this.sentCP = response;
                    this.ifLoadData = true;
                },
                err => {
                   
                    this.ifLoadData = true;
                    console.log(err)
                }
            );
        }else{
            this.suppliersServices.getCommercialOffersSent(supplier_id).subscribe(
                response => {
                    this.sentCP = response;
                    this.ifLoadData = true;
                },
                err => {
                   
                    this.ifLoadData = true;
                    console.log(err)
                }
            );
        }
     


        
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