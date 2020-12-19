import { Component, Input, Output, ViewChild } from '@angular/core';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RippleRef } from '@angular/material/core';
import { DatastreamService } from './datastream.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfilepageComponent } from './profilepage/profilepage.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'notebook-share';

  loggedIn: boolean = false;
  myNotes: any;
  users: any;
  user: any;
  profileData: any;
  avatarPath: string = "assets/img/avatars/a1.jpg"

  focus = false;
  navMenu: Array<boolean> = [false, true, false, false];


  constructor(private datastream: DatastreamService,  private dialog: MatDialog) { }

  ngOnInit() {

    this.datastream.getUsersFromDb().subscribe((res) => {
      this.users = res;
      console.log(res);
    })
  }

  ChooseMenu = (menuId) => {
    for(let index in this.navMenu) {
      this.navMenu[index]= false;
    }
    this.navMenu[menuId] = true;
    console.log(this.navMenu);
  }

  OpenProfileMenu = () => {


  }


  RecieveLoggedUser = (username: any) => {
    console.log("username= ", username);

    this.datastream.getUsersFromDb().subscribe((res) => {

      this.users = res;
      console.log("test 1 ", this.users);
      this.users.forEach(userdata => {
        if(userdata.name == username)
        {
          console.log(userdata.name,);
          this.user = userdata;
        }
      });

      this.loggedIn = true;
      console.log("logged in user:", this.user);

      this.datastream.getAllNotesFromUserFromDB(this.user.id).subscribe(res => {
        this.myNotes = res;
        console.log("notes from " + this.user.name + ":   ", res);
        this.profileData = {
          user: this.user,
          notes: this.myNotes,
          profilepic: this.avatarPath
        }
      });

    });


  }

  deleteAndLogOut = (e) =>{
      this.loggedIn = e;
  }

  logOut = () => {
    this.loggedIn = false;
  }
}

