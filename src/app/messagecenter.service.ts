import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagecenterService {

  private storedMessage = new Subject();
  currentMessage = this.storedMessage.asObservable();

  constructor(private snackbar: MatSnackBar) {
   }

  messageType = (message): string =>{
    for(let property in message){
      if(message.hasOwnProperty(property)){
        if(property == "error"){
          return property.valueOf();
        }
        if(property == "success"){
          return property.valueOf();
        }

      }
    }
  }

  show = (message) =>{
    let type = this.messageType(message);
    return this.snackbar.open(message[type], type, {duration: 3000});
  }

  store = (message) => {
    this.storedMessage.next(message);
  }

  message = () =>{
    return this.storedMessage;
  }
}
