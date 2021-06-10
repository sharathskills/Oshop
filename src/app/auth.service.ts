import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Username$: Observable<firebase.default.User | null>;
  constructor(private aFAuth: AngularFireAuth) { 
    this.Username$ = aFAuth.authState;
  }

  login()
  {
      this.aFAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logout()
  {
      this.aFAuth.signOut();
  }
}

