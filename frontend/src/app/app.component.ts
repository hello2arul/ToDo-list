import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IssueService } from './issue.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo-list';
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  listTitle = this.days[new Date().getDay()];
  toAdd = '';
  items = [];
  constructor(private issueService: IssueService) {
  }
  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    const gotItems = this.issueService.getItems();
    gotItems.subscribe((data: any[])=>{
      data.forEach(val => {
        console.log(val.name);
        this.items.push(val.name);
      });
    });
  }

  addItem(): void {
    this.issueService.addItem(this.toAdd);
    this.items.push(this.toAdd);
    this.toAdd = '';
  }

  deleteItem(toDelete): void {
    this.issueService.deleteItem(toDelete);
    this.items = this.arrayRemove(this.items, toDelete);
  }

  arrayRemove(arr, value): []{
    return arr.filter((ele) => ele !== value);
  }
}
