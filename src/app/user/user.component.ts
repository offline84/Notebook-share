import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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


  addUser = (user) =>{
    let inputcheck = 0;
    this.userdata.forEach(element => {
      if(element.name == user){
        console.log("deze naam zit reeds in onze database, kies een andere naam.");
        inputcheck++;
      }
    });

    if(inputcheck == 0){
      this.dataStream.addUserToDb(user).subscribe(
      (error) =>{
        console.log(error);
      });

      this.userSubject.next( alert(user + ' is toegevoegd!'));
      this.getUsers();

    }else alert("deze naam zit reeds in onze database, kies een andere naam.");
    this.newUser.nativeElement.value = null;
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
