import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from './service/contact.service';
import { ContactComponent } from './contact/contact.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-material';

  isPopupOpened = false;

  constructor(private dialog?:MatDialog,
    private _contactService?: ContactService) { }

  ngOnInit() {
  }

  get ContactList() {
    return this._contactService.getAllContacts();
  }

  addContact() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(ContactComponent, {
      data: {}
    });

  dialogRef.afterClosed().subscribe(result => {
    this.isPopupOpened = false;
    });
  }

  editContact(id: number) {
    this.isPopupOpened = true;
    const contact = this._contactService.getAllContacts().find(c=> c.ID === id);
    const dialogRef = this.dialog.open(ContactComponent, {
      data: contact
    });

  dialogRef.afterClosed().subscribe(result => {
    this.isPopupOpened = false;
    });
  }

  deleteContact(id: number) {
      this._contactService.deleteContact(id);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex, event.currentIndex);
      }
    }
}