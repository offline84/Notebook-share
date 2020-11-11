import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatastreamService {

  constructor(private http: HttpClient) { }

  getUsersFromDb = () => {
    return this.http.get('https://clear-diagnostic-inspiration.glitch.me/users');
  }

  addUserToDb = (newUser) => {

    return this.http.post('https://clear-diagnostic-inspiration.glitch.me/users', {'name': newUser});
  }
}
