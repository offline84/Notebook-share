import { Component, OnInit } from '@angular/core';
import { DatastreamService } from '../datastream.service';

@Component({
  selector: 'app-sorted-notes',
  templateUrl: './sorted-notes.component.html',
  styleUrls: ['./sorted-notes.component.css']
})
export class SortedNotesComponent implements OnInit {
  sortedNotes: any;
  assignments:any;
  options: string;
  method = false;
  users: any;
  categories: any;
  constructor(private datastream: DatastreamService) {

  }

  ngOnInit(): void {
    let search = "";
    let searchby;
    let exactly = false;
    this.datastream.searchInDb(search,searchby,exactly).subscribe(data=>{
      this.sortedNotes = data;
      this.sortedNotes.sort(a=> a.title);
      console.log("sortedNotes:", this.sortedNotes);
    });

    this.datastream.getAssignmentsFromDb().subscribe((data)=>{
      this.assignments = data;
      console.log("assignments",this.assignments);
    });

    this.datastream.getUsersFromDb().subscribe(data =>{
      this.users = data;
    });

    this.datastream.getCategoriesFromDb().subscribe(data =>{
      this.categories = data;
      this.categories.sort(a => a.tag);
      console.log("categories", this.categories);
    })
  }
  changeOrder = () =>{
      this.users.reverse();
      this.sortedNotes.reverse();
      this.categories.reverse();
  }
}
