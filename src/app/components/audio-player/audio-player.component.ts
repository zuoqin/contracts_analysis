import { OnInit, Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector:"audio-player",
    templateUrl:"./audio-player.component.html"
})
export class AudioPlayerComponent implements OnInit{
    @Input('src') src;
    audio;
     ifStopShow:boolean = false;
    ifPlay:boolean = false;
    constructor(
      
    ){}
    ngOnInit(){
      
    }

    playCall(){
        console.log(this.src)
        if(!this.audio){
            this.audio = new Audio();
            this.audio.src = this.src;
            this.audio.load();
        }
  
        this.audio.play();
        this.ifStopShow = true;
        this.ifPlay = true;
      
    }
    pauseCall(){
        this.ifPlay = false;
        this.audio.pause();
    }
    stopCall(){
        this.ifStopShow = false;
        this.audio.currentTime = 0;
        this.ifPlay = false;
        this.audio.pause();
     
    }

}