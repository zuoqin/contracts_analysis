import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
/*Services*/
import { UserServices } from '@core';
@Component({
    selector:"search",
    templateUrl:"./search.component.html"
})
export class SearchComponent implements OnInit{

    constructor(
        private userServices:UserServices
    ){}
    ngOnInit(){
        this.userServices.getEmailManagerList().subscribe(
            response => {
                this.userServices.managerUserEmailList = response.data;
            },
            err => {

                console.log(err)
            }
        );
    }
}