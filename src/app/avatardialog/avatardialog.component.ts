import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { title } from 'process';
import { of } from 'rxjs';


@Component({
  selector: 'app-avatardialog',
  templateUrl: './avatardialog.component.html',
  styleUrls: ['./avatardialog.component.css']
})
export class AvatardialogComponent implements OnInit {

  profilePicture: string[] = [
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F1.jpg?v=1607051294733",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F5.jpg?v=1607051296772",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F4.jpg?v=1607051297905",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F2.jpg?v=1607051298060",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F8.jpg?v=1607051298450",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F7.jpg?v=1607051298660",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F9.jpg?v=1607051298909",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F3.jpg?v=1607051299694",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm6.jpg?v=1607051296598",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm4.jpg?v=1607051296898",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm7.jpg?v=1607051297771",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm2.jpg?v=1607051298122",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm1.jpg?v=1607051298303",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm3.jpg?v=1607051298379",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm5.jpg?v=1607051298730",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa4.jpg?v=1607051294650",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa3.jpg?v=1607051296200",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa5.jpg?v=1607051296704",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa7.jpg?v=1607051296801",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa1.jpg?v=1607051298470",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa2.jpg?v=1607051298934",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa6.jpg?v=1607051299753"
  ];

  constructor(private dialogRef: MatDialogRef<AvatardialogComponent>) {}

  ngOnInit(): void {}

  close = () => {
    this.dialogRef.close();
  }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
