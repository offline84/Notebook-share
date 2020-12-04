import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  addedUser: string;
  success: string;
  error: string;

  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) private data){
    this.success = data.messageinfo.success;
    this.error = data.messageinfo.error;
    this.addedUser = data.username;
    console.log(this.addedUser);
    console.log(this.success);
    console.log(this.error);
  }

  close = () => {
    this.dialogRef.close();
  }
}
