import { Component, OnInit } from '@angular/core';

export class Notification {   
  image:string;
  text:string;
}
const NOTIFICATIONS: Notification[] = [
  {image:"assets/noti_message.png", text: "Nova poruka"},
  {image:"assets/noti_message.png", text: "Nova poruka"},
  {image:"assets/noti_document.png", text: "Ubacen novi dokument"},
  {image:"assets/noti_photo.png", text:"Nove forgrafije sa vaseg gradilista"},
  {image:"assets/noti_todo_done.png", text:"Stavka iz To-Do liste zavrsena"},
  {image:"assets/noti_survey.png", text:"Imate novu anketu"},
  {image:"assets/noti_document.png", text: "Ubacen novi dokument"},
  {image:"assets/noti_photo.png", text:"Nove fotografije sa vaseg gradilista"},
  {image:"assets/noti_todo_done.png", text:"Stavka iz To-Do liste zavrsena"},
  {image:"assets/noti_todo.png", text:"Nova stavka u To-Do listi"},
  {image:"assets/noti_document.png", text:"Ubacen novi dokument"},
  {image:"assets/noti_todo_time.png", text:"Blizi se rok za odgovorTo-Do stavke"}
]

@Component({
  selector: 'app-task-right',
  templateUrl: './task-right.component.html',
  styleUrls: ['./task-right.component.css'],
})

export class TaskRightComponent implements OnInit {
  notifications = NOTIFICATIONS;
  showNotification: boolean;
  
  constructor() {  
    this.showNotification = false;
    
  }

  notification(event) {
    this.showNotification = true;
    event.stopPropagation();
  }

  hide(event){
    this.showNotification = false;
    event.stopPropagation();
   }
  
  ngOnInit() {
  
  }
  
}
