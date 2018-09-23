import { Component,ViewChild,Input,OnInit } from '@angular/core';

@Component({
    selector:"suppliers-table",
    templateUrl:"./suppliers-table.component.html"
})
export class SuppliersTableComponent implements OnInit{

    @Input('suppliersData') suppliersData;
    @Input('noShowSupplier') noShowSupplier;
    
    @Input('dataColumns') dataColumns;
    @ViewChild('addCommercialProposalModal') addCommercialProposalModal;
    @ViewChild('addSupplierModal') addSupplierModal;
    @ViewChild('sentCPModal') sentCPModal;
    @ViewChild('sendingCPModal') sendingCPModal;
    
    ngOnInit(){
        console.log(this.noShowSupplier)
    }
    
    

    isColumnActive(columnId){
        return this.dataColumns.filter(item=>item.id==columnId)[0].active
    }
    onSelectedColumns(value){
        this.dataColumns = value;
    }
    addCommercialProposal(){
        this.addCommercialProposalModal.open()
    }
    addSupplier(){
        this.addSupplierModal.open()
    }
    showSentCPModal(){
        this.sentCPModal.open()
    }
    showSendingCPModal(){
        this.sendingCPModal.open()
    }
    
}