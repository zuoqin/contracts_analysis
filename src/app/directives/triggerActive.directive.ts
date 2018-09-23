import { Directive, ElementRef, HostBinding,HostListener } from '@angular/core';

@Directive({
    selector: '[trigger-active]'
})

export class TriggerActiveDirective {
    @HostBinding('class.active') isActive = false;
    @HostListener('click', ['$event']) onClick(btn) {
        this.removeAllActive();
        console.log(btn.target.closest(".toggle-class").classList)
        btn.target.closest(".toggle-class").classList.toggle("active");
    }

    @HostListener('document:click', ['$event'])
    public documentClick(event): void {
        if(
            !event.target.closest(".popup-form")&&
            !event.target.closest(".category")
        ){
            this.removeAllActive()
        }
    }
    removeAllActive(){
        let index = document.getElementsByClassName('toggle-class').length;
        for (let i = 0; i < index; i++) {
            document.getElementsByClassName('toggle-class')[i].classList.remove("active") 
        }
    }



}
