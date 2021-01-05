import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class DatastreamService {

  constructor(private http: HttpClient) { }

  //Retrieving or sending data concerning Users

  getUsersFromDb = () => {
    return this.http.get('https://clear-diagnostic-inspiration.glitch.me/users');
  }

  addUserToDb = (newUser) => {
    return this.http.post('https://clear-diagnostic-inspiration.glitch.me/users', { 'name': newUser });
  }

  deleteUserFromDb = (userId) => {
    let req = new HttpParams().set("id", userId);
    return this.http.delete('https://clear-diagnostic-inspiration.glitch.me/users', { params: req });
  }

  //Retrieving or sending data concerning Notes

  getAllNotesFromUserFromDB = (id) => {
    let req = new HttpParams().set("user", id);
    return this.http.get('https://clear-diagnostic-inspiration.glitch.me/users/notes', { params: req });
  }

  postNoteFromUserToDb = (id, title, data) => {
    return this.http.post('https://clear-diagnostic-inspiration.glitch.me/users/notes', { 'title': title, 'user_id': id, 'note': data });
  }

  deleteNoteFromUserFromDb = (id) => {
    let req = new HttpParams().set("id", id);
    return this.http.delete('https://clear-diagnostic-inspiration.glitch.me/users/notes', { params: req });
  }
  adjustNoteFromUsertoDb = (id, title, note) => {
    return this.http.patch('https://clear-diagnostic-inspiration.glitch.me/users/notes', { 'title': title, 'id': id, 'note': note });
  }
  getCategoriesFromDb = () => {
    return this.http.get('https://clear-diagnostic-inspiration.glitch.me/categories');
  }
  assignCategoriesToNotesInDb = (noteId, tag) => {
    return this.http.post('https://clear-diagnostic-inspiration.glitch.me/notes/categories',{'noteId': noteId, 'cat': tag});
  }
  removeCategoriesFromNotesInDb = (noteId, tag) =>{
    let id = new HttpParams().set("note_id", noteId)
      .append("cat", tag);

    return this.http.delete('https://clear-diagnostic-inspiration.glitch.me/notes/categories', {params: id});
  }
  getAssignmentsFromDb =() => {
    return this.http.get('https://clear-diagnostic-inspiration.glitch.me/assignments/categories');
  }
  getCoupledCategoriesFromDb =(id) => {
    let req = new HttpParams().set("id", id);

    return this.http.get('https://clear-diagnostic-inspiration.glitch.me/categories/user', { params: req });
  }
  getLastInsertedId = () =>{
    return this.http.get('https://clear-diagnostic-inspiration.glitch.me');
  }
}

