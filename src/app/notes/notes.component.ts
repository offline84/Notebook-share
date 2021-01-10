import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatastreamService } from '../datastream.service';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { MessagecenterService } from '../messagecenter.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})

export class NotesComponent {
  @Input() note: any;
  @Input() tags: any;
  @Output() updateEvent = new EventEmitter();
  @Output() changeStyleEvent = new EventEmitter<boolean>();
  @Input() myNotes: boolean;
  @Input() users: any;

  constructor(private datastream: DatastreamService, private message: MessagecenterService, private dialog: MatDialog){
  }

  deleteNote = () =>{
    let noteId = this.note.id;
    this.datastream.deleteNoteFromUserFromDb(noteId).subscribe(res =>{
      this.message.show(res);

      this.updateEvent.emit();

    });
  }

  openEditNoteDialog = () => {
    const config = new MatDialogConfig();
    let tagsForNote = [];
    this.tags.forEach(tag => {
      for(let p in tag){
        if(p == "noteId"){
          if(tag[p] == this.note.id){
            tagsForNote.push(tag.tag);
          }
        }

      }
    });

    config.autoFocus = true;

    config.data = {
      noteId:this.note.id,
      title: this.note.title,
      content:this.note.note,
      tags:tagsForNote
    }

    this.changeStyleEvent.emit(false);

    this.dialog.open(EditNoteDialogComponent, config);

    this.dialog.afterAllClosed.subscribe(()=>{
      this.updateEvent.emit();
      this.changeStyleEvent.emit(true);
  });
  }
}
