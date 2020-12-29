import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})

export class NotesComponent {
  @Input() note: any;
  @Input() tags: any;

  constructor(){
    console.log(this.tags);
  }
}
