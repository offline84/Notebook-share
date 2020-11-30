import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { DatastreamService } from '../datastream.service';

@Component({
  selector: 'layout-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})


export class LoginpageComponent implements OnInit {

  @Output() loginEvent = new EventEmitter<any>();

  user: any;
  usersdata: any;
  userIsInvalid: boolean;
  selectedUsername: string;
  usernames: any;


  constructor(private datastream: DatastreamService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.GetRegisteredUsername('');
    this.GetUsers();
  }

  GetUsers = () =>{
    this.datastream.getUsersFromDb().subscribe((data) => {
      this.usersdata = data;
    });
  }

  GetRegisteredUsername = (username) => {
    this.datastream.getDistinctUserFromDb(username).subscribe((data) => {
      this.user = data;
    });
  }

  ValidateUser = (name: any) => {
    this.userIsInvalid = true;
    this.usersdata.forEach(user => {
      if(user.name === name) {
        this.userIsInvalid = false;
      }
    });
}

CheckUsernameValidity = (name) =>{
  this.GetRegisteredUsername(name);
  this.ValidateUser(name);
}


  addUser = (username, modalname) =>{

      if(this.userIsInvalid){
      this.datastream.addUserToDb(username).subscribe(
      (error) =>{
        console.log(error);
      });
      this.modalService.dismissAll();
      this.OpenModal(modalname);
      setTimeout(this.GetUsers,3000);
    }
  }

  LogIn =(username) => {
    this.CheckUsernameValidity(username);
    if(!this.userIsInvalid){
      this.loginEvent.emit(!this.userIsInvalid);
    }
  }

  OpenList = (listofusernames) =>{
    let value: number = 0;
    this.selectedUsername = "";

    this.usernames = [this.usersdata.length];
    this.usersdata.forEach(element => {
      this.usernames[value]={value: value, viewvalue: element.name};
      value++;
    });

    this.OpenModal(listofusernames);
  }

  OpenModal =(modalname) => {
    this.GetUsers;
    this.modalService.open(modalname);
    console.log("Modal is open");
  }

  CloseModal = () => {
    this.modalService.dismissAll();
  }

  EraseName = () => {
    this.modalService.dismissAll();
    this.selectedUsername = "";
  }

}
