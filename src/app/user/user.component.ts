import { Component, Input, OnInit } from '@angular/core';
import { DatastreamService } from '../datastream.service';
import { MessagecenterService } from '../messagecenter.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() profile: any;
  tagsList: any;
  checkboxAddTag: boolean;
  tags: Array<string>= new Array<string>();
  isActive: boolean;

  constructor(private datastream: DatastreamService, private messagecenter: MessagecenterService){

  }

  ngOnInit() {
    this.datastream.getCategoriesFromDb().subscribe((categories) => {
      this.tagsList = categories;
      console.log(categories);
      console.log("userprofile: " ,this.profile);
    });
  }

  addNewTag = (cat) =>{
    let duplicate;
    this.tags.forEach((tag=>{
      if(tag == cat){
        duplicate = true;
      }
    }))
    if(cat && !(duplicate)){
      this.tags.push(cat);
    }
  }

  removeTag = (tag) =>{
    const index = this.tags.indexOf(tag);

    if(index >= 0){
      this.tags.splice(index, 1);
    }
  }

  addNote = (title, note) => {
    let noteId;

    //first post note
    this.datastream.postNoteFromUserToDb(this.profile.user.id, title, note).subscribe(note => {
      //check for error and if not continue
      if(this.messagecenter.messageType(note) == "success"){

        // get last inserted id of note
        this.datastream.getLastInsertedId().subscribe(note_id => {
          noteId = note_id;
          console.log(this.tags);
          console.log(noteId[0].id);

          //assign tags to note if available
          if (this.tags.length > 0) {
            this.tags.forEach(tag => {
              this.datastream.assignCategoriesToNotesInDb(noteId[0].id, tag).subscribe((err) => {
                if(this.messagecenter.messageType(err) == "error"){
                  this.messagecenter.store(err);
                }
              })
            });
            this.tags = new Array<string>();
            this.updateProfile();
          }
        });
      }
      this.messagecenter.show(note).afterDismissed().subscribe(() => {
        this.messagecenter.currentMessage.subscribe(message =>{
          if (this.messagecenter.messageType(message) == "error") {
            this.messagecenter.show(message);
          }
        });
      });
    });
    this.updateProfile();
  }

  updateProfile = () => {
    this.datastream.getAllNotesFromUserFromDB(this.profile.user.id).subscribe(notes => {
      this.profile.notes = notes;
      this.datastream.getCoupledCategoriesFromDb(this.profile.user.id).subscribe(dir => {
        this.profile.tagsDirective = dir;
        console.log("new profile", this.profile);
      });
    });
  }

  changeStyle = ($event) =>{
     this.isActive = $event;
  }

}
