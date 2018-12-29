import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onMenuSelected(activeMenu: string) {
    this.menuChanged.emit(activeMenu);
  }
}
