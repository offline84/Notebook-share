import { Component, Input, Output, ViewChild } from '@angular/core';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RippleRef } from '@angular/material/core';
import { DatastreamService } from './datastream.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AvatardialogComponent } from './avatardialog/avatardialog.component';

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
  avatarPath: string = "assets/img/avatars/a1.jpg"

  focus = false;
  navMenu: Array<boolean> = [true, false, false, false];


  constructor(private datastream: DatastreamService,  private dialog: MatDialog) { }

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

  getAvatarDialog = () => {
    const messageDialogConfig = new MatDialogConfig();

    messageDialogConfig.autoFocus = true;

    this.dialog.open(AvatardialogComponent,messageDialogConfig);
  }
}

