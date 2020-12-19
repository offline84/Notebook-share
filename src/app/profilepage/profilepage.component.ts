import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  @Input() profile: any;
  @Output() LogoutEvent = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.profile);
  }

  confirmDelete = () => {
    const deleteUserDialogConfig = new MatDialogConfig();
    deleteUserDialogConfig.data = {
      name: this.profile.user.name,
      id: this.profile.user.id
    }
    let dialogRef = this.dialog.open(DeleteUserComponent, deleteUserDialogConfig);
    dialogRef.afterClosed().subscribe(res =>{
      this.LogoutEvent.emit(res);
    });
  }
}
