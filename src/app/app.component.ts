import { Component, Input, Output, ViewChild } from '@angular/core';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RippleRef } from '@angular/material/core';
import { DatastreamService } from './datastream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'notebook-share';

  @ViewChild(LoginpageComponent) logincredentials;

  loggedIn: boolean = false;
  users: any;
  user: any;

  focus = false;
  navMenu: Array<boolean> = [true, false, false, false];


  constructor(private datastream: DatastreamService) { }

  ngOnInit() {

    this.datastream.getUsersFromDb().subscribe((res) => {
      this.users = res;
      console.log(res);
    })
  }

  ngAfterViewInit() {
    this.user = this.logincredentials.user;
  }


  ChooseMenu = (menuId) => {
    for(let index in this.navMenu) {
      this.navMenu[index]= false;
    }
    this.navMenu[menuId] = true;
    console.log(this.navMenu);
  }

  RecieveLoggedUser = (username: any) => {
    console.log("usernname= ", username);
    this.users.forEach(userdata => {
      if(userdata.name == username) {
        console.log(userdata.name,);
        this.user = userdata;
      }
    });
    this.loggedIn = true;
    console.log("logged in user:", this.user);
  }

  logUser = ()=>{
    console.log(this.user);
  }
}
