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

      console.log(this.profile);
    });
  }

  addNewTag = (cat) =>{
    if(cat){
      this.datastream.postCategorieToDb(cat).subscribe(res =>{
        console.log(res);
        this.tags.push(cat);

        this.datastream.getCategoriesFromDb().subscribe((categories) => {
          this.tagsList = categories;

          console.log(this.tags);
        });

      });
    }
  }

  removeTag = (tag) =>{
    const index = this.tags.indexOf(tag);

    if(index >= 0){
      this.tags.splice(index, 1);
    }
  }

  addNote = (title, note) => {
    let userId = this.profile.user.id;
    let notes = this.profile.notes;

    this.datastream.postNoteFromUserToDb(userId, title, note).subscribe(result=>{

      for(let prop in result){

        if(result.hasOwnProperty(prop)){

          if(prop == "success" || prop == "error"){
            this.messagecenter.open(result[prop], prop, {duration: 3000});
          }
        }
      }

      this.datastream.getAllNotesFromUserFromDB(userId).subscribe(data =>{
        notes = data;

        notes.forEach(note => {

          if(note.title == title){

            this.tags.forEach(lucidtag =>{
              this.tagsList.forEach(dbTag =>{

                if(lucidtag == dbTag.tag){
                  this.datastream.assignCategoriesToNotesInDb(note.id, dbTag.id).subscribe(res=>{

                    for(let prop in res){

                      if(res.hasOwnProperty(prop)){

                        if(prop == "success" || prop == "error"){
                          this.messagecenter.open(res[prop], prop, {duration: 3000});
                        }
                      }
                    }
                  });
                }
              });
            });
          }
          this.tags = new Array<string>();
        });
      });

    });
  }

}
