import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatastreamService } from '../datastream.service';



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

  constructor(private datastream: DatastreamService, private messagecenter: MatSnackBar){

  }

  ngOnInit() {
    this.datastream.getCategoriesFromDb().subscribe((categories) => {
      this.tagsList = categories;
      console.log(categories);
      console.log("userprofile: " ,this.profile);
    });
  }

  addNewTag = (cat) =>{
    if(cat){
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

    /////////////////////////////////////////categories not adding!!!!
    let tagId;
    let noteId;
    let log;

    //first post note
    this.datastream.postNoteFromUserToDb(this.profile.user.id,title, note).subscribe(note=>{

      //check for error and if not continue
      for(let prop in note){

        if(note.hasOwnProperty(prop)){

          if(prop == "error"){
            return note;
          }
          else log = note;
        }
      }

      // get last inserted id of note
      this.datastream.getLastInsertedId().subscribe(note_id=>{

        noteId = note_id;
        console.log(noteId[0].id);

        //check if tags are submitted and post them
        if(this.tags.length > 0){
          this.tags.forEach(tag=>{
            this.datastream.postCategorieToDb(tag).subscribe(cat=>{

              //get tagId
              for(let prop in cat){

                if(cat.hasOwnProperty(prop)){
                  //if new entry
                  if(prop == "success"){

                    this.datastream.getLastInsertedId().subscribe(tag_id=>{
                      tagId = tag_id;
                      console.log(tagId[0].id);
                      //assign tag to note
                      let assignmentCheck = this.assignTag(noteId[0].id,tagId[0].id);
                      if(assignmentCheck){
                        log = assignmentCheck
                      }
                    });
                  }
                  //find id
                  else{
                      this.tagsList.forEach(element=>{
                        if(tag == element.tag){
                          tagId = element.id;
                        }
                      });
                      let assignmentCheck = this.assignTag(noteId,tagId);
                        if(assignmentCheck){
                          log = assignmentCheck
                        }

                  }
                }
              }
              this.tags = new Array<string>();
            });
          });
        }
      });
    });
    return log;
  }


assignTag = (noteId, tagId): any => {
  this.datastream.assignCategoriesToNotesInDb(noteId, tagId).subscribe(res=>{

    for(let prop in res){
      if(res.hasOwnProperty(prop)){

        if(prop == "error"){
          return res;
        }
      }
    }
  });
}
}
