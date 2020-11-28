import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject} from 'rxjs';
import { DatastreamService } from '../datastream.service';

@Component({
  selector: 'layout-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})


export class LoginpageComponent implements OnInit {
  @ViewChild('username') name: ElementRef;

  user: any;
  userIsInvalid: boolean = false;
  userObservable: BehaviorSubject<any> =new BehaviorSubject<any>(null);
  selectedUsername: string;
  usernames: any;

  constructor(private datastream: DatastreamService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  checkUsername = (username) => {
    let checkUser: any;

    checkUser = this.userObservable.asObservable();

    this.datastream.getDistinctUserFromDb(username).subscribe((data) => {
      this.user = data;
      checkUser.subscribe(this.user);
      this.userObservable.next(this.ValidateUser());
    });


  }

  addUser = (username) =>{

    this.checkUsername('username');

      if(this.userIsInvalid){
      this.datastream.addUserToDb(username).subscribe(
      (error) =>{
        console.log(error);
      });

      this.userObservable.next( alert(username + ' is toegevoegd!'));

    }
  }

  ValidateUser = () => {
      if(this.user.length != 1){
        this.userIsInvalid = true;
      }else{ this.userIsInvalid = false; }
      console.log("invalid user = " + this.userIsInvalid);
  }

  OpenList = (listofusernames) =>{
    let value: number = 0;

    this.checkUsername('');

    this.usernames = [this.user.length];
    console.log(this.usernames);
    this.user.forEach(element => {
      this.usernames[value]={value: value, viewvalue: element.name};
      value++;
    });

    this.OpenModal(listofusernames);
  }

  OpenModal =(modalname) => {
    this.modalService.open(modalname);
    console.log("Modal is open");
  }

  getUsername = () => {
    this.modalService.dismissAll();
    this.name.nativeElement.value = this.selectedUsername;
  }

}
