import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,
    private router: Router) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onFetch() {
    this.dataStorageService.getRecipes();
  }

  onSave() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: HttpEvent<Object>) => {
        if (response.type === HttpEventType.Sent) {
          console.log('Sent Event');
        } else {
          console.log(response);
        }
      }
    );
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }
}
