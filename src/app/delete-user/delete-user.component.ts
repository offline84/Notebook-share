import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { DatastreamService } from '../datastream.service';


@Component({
  selector: 'dialog-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {


  loggedIn: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private datastream: DatastreamService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteUserComponent>){

  }

  ngOnInit(): void {
    console.log(this.data);
  }

  deleteUser = () => {
    this.datastream.deleteUserFromDb(this.data.id).subscribe(res  => {
      console.log(res);

      this.openMessageDialog(res);

      this.loggedIn = false;
      this.dialogRef.close(this.loggedIn);
    });
  }
  openMessageDialog = (message) => {
    const messageDialogConfig = new MatDialogConfig();

    messageDialogConfig.autoFocus = true;

    messageDialogConfig.data = {
      messageinfo: message,
      username: this.data.name,
      delete: true
    }

    this.dialog.open(AddUserDialogComponent, messageDialogConfig);
  }
}
