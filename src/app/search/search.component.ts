import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DatastreamService } from '../datastream.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string;

  focus: boolean = true;
  advanced_search: boolean = false;
  color: ThemePalette = "primary";
  byUser: boolean = false;
  byTitle: boolean = false;
  byCategory: boolean = false;
  byContent: boolean = false;
  exactMatch: boolean = false;

  users: any;
  assignments: any;
  filteredNotes: any;

  constructor(private datastream: DatastreamService) {

  }

  ngOnInit(): void {
    this.datastream.getUsersFromDb().subscribe((data)=>{
      this.users = data;
      console.log("users", this.users);
    });
    this.datastream.getAssignmentsFromDb().subscribe((data)=>{
      this.assignments = data;
      console.log("assignments",this.assignments);
    });
  }
  search = () => {
    if(!this.searchText){
      this.searchText = "";
    }
    let directive;
    if(this.byUser){
      directive = "byUser";
    }
    if(this.byCategory){
      directive = "byCat";
    }
    if(this.byTitle){
      directive = "byTitle";
    }
    if(this.byContent){
      directive = "byContent";
    }
    this.datastream.searchInDb(this.searchText, directive, this.exactMatch).subscribe(data=>{
      this.filteredNotes = data;
      console.log(this.filteredNotes);

    });
  }
}
