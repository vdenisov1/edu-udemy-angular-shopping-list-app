import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDHAKGjfytKV09JlfTX97VNu1vIaKpsw0o",
      authDomain: "ng-recipe-book-b4ea3.firebaseapp.com",
    })
  }
}
