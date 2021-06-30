import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { UserService } from './user.service';
import 'rxjs/add/observable/of' ;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Username$: Observable<firebase.default.User | null>;
  constructor(private userService:UserService, private aFAuth: AngularFireAuth, private route: ActivatedRoute) { 
    this.Username$ = aFAuth.authState;
  }

  login()
  {
      let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);
      this.aFAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logout()
  {
      this.aFAuth.signOut();
  }

  get appUser$(): Observable<AppUser | null>
  {
    return this.Username$.switchMap(user => 
    {
      if(user) return this.userService.get(user!.uid).valueChanges();

      return Observable.of(null);
    });
  }
}

