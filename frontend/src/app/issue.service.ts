import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get(`${this.uri}/getItems`);
  }

  addItem(item) {
    const obj = {
      name: item
    };
    this.http.post(`${this.uri}/postItem`, obj).subscribe(res => {
      return res;
    });
  }
  deleteItem(item) {
    const obj = {
      name: item
    };
    this.http.post(`${this.uri}/deleteItem`, obj).subscribe(res => {
      return res;
    });
  }

}
