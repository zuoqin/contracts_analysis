import { Component,ViewChild, Input } from '@angular/core';

/*Plugins*/
import {BsModalComponent } from 'ng2-bs3-modal';



@Component({
    selector:"text-modal",
    templateUrl:"./text-modal.component.html"
})
export class TextModalComponent{
    @ViewChild('textModal') textModal: BsModalComponent;
    text;
    title;

  
    onClose(){

    }
    open(text,title?){ 
        this.text = text;
        this.title = title;
        this.textModal.open();
    }
    close(){
        this.textModal.close();
    }


   
}