import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import { DatastreamService } from '../datastream.service';
import { MessagecenterService } from '../messagecenter.service';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.css']
})
export class EditNoteDialogComponent{
  @ViewChild('newTag') newTag: ElementRef;
 noteId: number;
 title: string;
 content: string;
 tags: any;
 newTags = [];


  constructor(private datastream: DatastreamService, private dialogRef: MatDialogRef<EditNoteDialogComponent>, @Inject(MAT_DIALOG_DATA) private data, private messagecenter: MessagecenterService){
    this.noteId = data.noteId;
    this.title = data.title;
    this.content = data.content;
    this.tags = data.tags;
  }

  close = () => {
    this.dialogRef.close();
  }
  addNewTag = (cat) =>{
    let duplicate;
    this.tags.forEach((tag=>{
      if(tag == cat){
        duplicate = true;
      }
    }))
    if(cat && !(duplicate)){
      this.newTags.push({cat: cat, added: true});
      this.tags.push(cat);
    }
    this.newTag.nativeElement.value = null;
  }

  removeTag = (tag) =>{
    const index = this.tags.indexOf(tag);

    if(index >= 0){
      this.tags.splice(index, 1);
      this.newTags.push({cat: tag, added: false})
    }
  }

  editNote = () => {
    //adjust note in DB
    this.datastream.adjustNoteFromUsertoDb(this.noteId, this.title, this.content).subscribe(res => {
      this.messagecenter.show(res);
    });
    console.log("new tags", this.newTags);
    //if new tags add assignment to db
    if (this.newTags.length > 0) {
      this.newTags.forEach(tag => {
        if (tag.added) {
          console.log("tag to add", tag.cat);
          this.datastream.assignCategoriesToNotesInDb(this.noteId, tag.cat).subscribe(err => {
            if (this.messagecenter.messageType(err) == "error") {
              this.messagecenter.show(err);
            }
          });
        }
        else{
          console.log("tag to remove ", tag.cat);
          this.datastream.removeCategoriesFromNotesInDb(this.noteId, tag.cat).subscribe(err => {
            if (this.messagecenter.messageType(err) == "error") {
              this.messagecenter.show(err);
            }
          });
        }
      });
    this.dialogRef.close();
    }
  }
}
