import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string;
  focus: boolean = true;
  constructor() { }
  advanced_search: boolean = false;
  color: ThemePalette = "primary";

  ngOnInit(): void {
  }

}
