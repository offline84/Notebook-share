import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'editor-profilepicture',
  templateUrl: './profilepicture.component.html',
  styleUrls: ['./profilepicture.component.css']
})
export class ProfilepictureComponent implements OnInit {

  maleProfile: Array<string> = [
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm6.jpg?v=1607051296598",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm4.jpg?v=1607051296898",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm7.jpg?v=1607051297771",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm2.jpg?v=1607051298122",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm1.jpg?v=1607051298303",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm3.jpg?v=1607051298379",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fm5.jpg?v=1607051298730",
  ];

  femaleProfile: Array<string> = [
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F1.jpg?v=1607051294733",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F5.jpg?v=1607051296772",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F4.jpg?v=1607051297905",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F2.jpg?v=1607051298060",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F8.jpg?v=1607051298450",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F7.jpg?v=1607051298660",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F9.jpg?v=1607051298909",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2F3.jpg?v=1607051299694",
  ];

  animalProfile: Array<string> = [
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa4.jpg?v=1607051294650",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa3.jpg?v=1607051296200",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa5.jpg?v=1607051296704",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa7.jpg?v=1607051296801",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa1.jpg?v=1607051298470",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa2.jpg?v=1607051298934",
    "https://cdn.glitch.com/34ab98b1-1f77-4d5f-b975-8f4b64e2ab81%2Fa6.jpg?v=1607051299753"
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
