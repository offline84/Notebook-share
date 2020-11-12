import { Component, OnInit,Input, ViewChild, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatastreamService } from '../datastream.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})

export class NotesComponent implements OnInit {
  @Input() user: UserComponent

  notesdata: any;
  notesubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  notes: any;
  showform: boolean = false;
  editform:boolean = false;

  constructor(private datastream: DatastreamService) { }

  ngOnInit(): void {
    this.getNotesFromUser(this.user.id);
    this.notes = this.notesubject.asObservable();
    this.notes.subscribe(this.notesdata);
   }

   getNotesFromUser = (userid) =>{
     this.datastream.getAllNotesFromUserFromDB(userid).subscribe(
       data =>{
        this.notesdata = data;
        console.log(this.notesdata);
      },
      error =>{
        console.log(error);
      });
   }

   addNote = (userid, title, note) =>{
     this.datastream.postNoteFromUserToDb(userid, title, note).subscribe((error) =>{
      console.log(error);
    });

    this.notesubject.next(this.notesdata);
    alert(`${title} is added to database!`);
    this.getNotesFromUser(userid);
   }

   deleteNote = (id) =>{
     this.datastream.deleteNoteFromUserFromDb(id).subscribe((error)=>{
       console.log(error);
     });

    this.notesubject.next(alert( `Note with id ${id} is deleted!`));
    this.getNotesFromUser(this.user.id);
   }

   editNote = (noteid, title, note) =>{
    this.datastream.adjustNoteFromUsertoDb(noteid, title, note).subscribe((error)=>{
      console.log(error);
    });
   }

   showForm = (e) =>{
    this.showform= e.target.checked;
   }

   showEditForm = (e) =>{
     this.editform=e.target.checked;
   }
}
