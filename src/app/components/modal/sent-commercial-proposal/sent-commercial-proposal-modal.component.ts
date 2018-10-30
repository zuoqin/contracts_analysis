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
    sentCP; //= [
        // {
        //     dateSent:"10.04.2018",
        //     dateGetPrice:"10.04.2018",
        //     email:"molokovsem@gmail.com",
        //     subject:"Коммерческое предложение на поставку молочной продукции от ИП Ивушкин А. Г.",
        //     status:"Отправлено",
        //     active:false,
        //     messages:[
        //         {
        //             text:"Добрый день,<br><br>Мы находимся в поиске поставщика молочной продукции в организации здравоохранения, образования, социальной защиты и отдыха детей. Пожалуйста, предоставте возможные варианты сотрудничества из расчета потребностей. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //             showAll:false
        //         },
        //         {
        //             text:"Здравствуйте,<br><br>Мы очень рады что вы обратились в нашу компанию. Пожалуйста, ознакомьтесь с ценами на соответствующие товары во вложении.",
        //             showAll:false,
        //             file:{
        //                     name:"Price lis.zip",
        //                     link:"http://sdf.shn-host.ru/Price list.zip"
        //                 }
        //         }
        //     ]
        // },
        // {
        //     dateSent:"11.04.2018",
        //     dateGetPrice:"15.04.2018",
        //     email:"moloko@gmail.com",
        //     subject:"Коммерческое предложение на поставку",
        //     status:"Отправлено",
        //     active:false,
        //     messages:[
        //         {
        //             text:"Добрый день,<br><br>Мы находимся в поиске поставщика",
        //             showAll:false
        //         },
        //     ]
        // }
    // ]




 

    
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