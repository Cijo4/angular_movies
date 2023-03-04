import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() movieTitleEmit = new EventEmitter<string>()
  movieTitle:string=''

  emitMovie(){
    //this.movieTitleEmit.emit(this.movieTitle)
    console.log(this.movieTitle);
    
  }

}
