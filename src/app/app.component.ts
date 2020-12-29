import { Component } from '@angular/core';
import { DatastreamService } from './datastream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'notebook-share';

  loggedIn: boolean = false;
  users: any;
  user: any;
  profileData: any;
  avatarPath: string = "assets/img/avatars/a1.jpg"

  focus = false;
  navMenu: Array<boolean> = [false, false, false, false];


  constructor(private datastream: DatastreamService) { }

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

  CreateProfile = (username: any) => {
    this.profileData = new Object();
    let tagsForUser;

    this.datastream.getUsersFromDb().subscribe((users) => {

      this.users = users;

      this.users.forEach(userdata => {
        if (userdata.name == username) {
          this.user = userdata;
        }
      });
      console.log("get user: ", this.user);

      this.loggedIn = true;
      console.log("logged in user:", this.user);

      this.datastream.getAllNotesFromUserFromDB(this.user.id).subscribe(notes => {

        console.log("notes from " + this.user.name + ":   ", notes);

        this.datastream.getCoupledCategoriesFromDb().subscribe(tags => {
          let t = tags as any;
          console.log("cc",t);

          if(t == Array<Object>()){
            t.forEach(tag => {
              console.log("check1");
              for (let property in tag) {
                if (property == "user") {
                  if (tag[property] == this.user.id) {
                    tagsForUser.push(tag);
                  }
                }
              }

            });
          }
          else{
            tagsForUser= tags
          }

          console.log(tagsForUser);
          this.profileData = {
            user: this.user,
            notes: notes,
            tagsDirective: tagsForUser,
            profilepic: this.avatarPath
          };

        });
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

