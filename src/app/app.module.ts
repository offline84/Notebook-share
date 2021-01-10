import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NotesComponent } from './notes/notes.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { ProfilepictureComponent } from './profilepicture/profilepicture.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MaterialModule } from './material/material.module';
import { EditNoteDialogComponent } from './edit-note-dialog/edit-note-dialog.component';
import { SearchComponent } from './search/search.component';
import { SortedNotesComponent } from './sorted-notes/sorted-notes.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NotesComponent,
    LoginpageComponent,
    AddUserDialogComponent,
    ProfilepageComponent,
    ProfilepictureComponent,
    DeleteUserComponent,
    EditNoteDialogComponent,
    SearchComponent,
    SortedNotesComponent,
    LoadingDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  entryComponents: [
    AddUserDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
