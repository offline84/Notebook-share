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
  delete: boolean;

  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) private data){
    this.success = data.messageinfo.success;
    this.error = data.messageinfo.error;
    this.addedUser = data.username;
    this.delete = data.delete;
  }

  close = () => {
    this.dialogRef.close();
  }
}
