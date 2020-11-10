import { Component, Input, OnInit } from '@angular/core';
import { DatastreamService } from '../datastream.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() name: string;
  users: any;

  constructor(private data: DatastreamService) {
    data.getUsersFromDb().subscribe((usersData) =>{
      this.users = usersData;
      console.log(this.users);
    });
  }

  ngOnInit(): void {

  }

}
