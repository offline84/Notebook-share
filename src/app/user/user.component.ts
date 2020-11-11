import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DatastreamService } from '../datastream.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() name: string;
  userdata: any;
  userSubject: BehaviorSubject<any> =new BehaviorSubject<any>(null);
  users: any;
  count: number = -1;


  constructor(private dataStream: DatastreamService) {
    this.getUsers();

    this.users = this.userSubject.asObservable();
    this.users.subscribe(this.userdata);
  }

  ngOnInit(): void {
  }
  addUser = (user) =>{
    this.dataStream.addUserToDb(user).subscribe((data) =>{
      alert(user + ' is toegevoegd!');
    },
    error =>{
      console.log(error);
    });
    this.userSubject.next(data =>{
      console.log(data);
    });
    setTimeout(this.getUsers,10000);
  }

  getUsers = () =>{

    this.dataStream.getUsersFromDb().subscribe((data) =>{
      this.userdata = data;
      console.log(this.userdata);
    });
  }
}
