import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { DatastreamService } from '../datastream.service';

@Component({
  selector: 'layout-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})


export class LoginpageComponent implements OnInit {

  @Output() loginEvent = new EventEmitter<any>();

  user: any;
  @Input() usersdata: any;
  userIsInvalid: boolean;
  selectedUsername: string;
  usernames: any;
  resultMessage: Object;
  errorText: string;


  constructor(private datastream: DatastreamService, private modalService: NgbModal, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.usersdata);
  }


  ValidateUser = (name: any) => {
    this.userIsInvalid = true;
    this.usersdata.forEach(user => {
      if(user.name === name) {
        this.userIsInvalid = false;
      }
    });
}


  addUser = (username) =>{
      this.datastream.addUserToDb(username).subscribe(
      (result) =>{

        this.resultMessage = result;
        this.openMessageDialog(result);

        this.datastream.getUsersFromDb().subscribe(result =>{
          this.usersdata = result;

          this.ValidateUser(username);

        });
      });
      this.modalService.dismissAll();

      // I want to use material dialog for this with injecting data when opening dialog. instead of modals.
      // https://material.angular.io/components/dialog/examples
    }

  LogIn =(username) => {
    this.ValidateUser(username);
    if(!this.userIsInvalid){
      this.loginEvent.emit(username);
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

  openMessageDialog = (message) => {
    const messageDialogConfig = new MatDialogConfig();

    messageDialogConfig.autoFocus = true;

    messageDialogConfig.data = {
      messageinfo: message,
      username: this.selectedUsername
    }

    this.dialog.open(AddUserDialogComponent, messageDialogConfig);
  }
}
