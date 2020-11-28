import { Component, ElementRef, Input, OnInit, ViewChild, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatastreamService } from '../datastream.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() id: number;
  @ViewChild('newUser') newUser: ElementRef;
  userdata: any;
  userSubject: BehaviorSubject<any> =new BehaviorSubject<any>(null);
  users: any;


  constructor(private dataStream: DatastreamService) {

  }

  ngOnInit(): void {
    this.getUsers();
    this.users = this.userSubject.asObservable();
    this.users.subscribe(this.userdata);
  }

  deleteUser = (userId) =>{
    this.dataStream.deleteUserFromDb(userId).subscribe((error)=> {
      console.log(error);
    });

    this.userSubject.next( alert("De gebruiker is successvol verwijderd uit de database"));
    this.getUsers();
  }

  getUsers = () =>{

    this.dataStream.getUsersFromDb().subscribe((data) =>{
      this.userdata = data;
      console.log(this.userdata);
    });
  }
}
