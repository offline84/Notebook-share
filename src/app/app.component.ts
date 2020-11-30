import { Component, Input, Output, ViewChild } from '@angular/core';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RippleRef } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
@ViewChild(LoginpageComponent) logincredentials;
user: any;

ngAfterViewInit() {
  this.user = this.logincredentials.user;
}

  title = 'notebook-share';
  loggedIn: boolean = false;

  focus = false;
  navMenu: Array<boolean> = [ true, false, false, false];

  ChooseMenu = (menuId) => {
    for(let index in this.navMenu) {
      this.navMenu[index]= false;
    }
    this.navMenu[menuId] = true;
    console.log(this.navMenu);
  }

  RecieveLoggedUser = (e: boolean) => {
    this.loggedIn = e;
  }
}
