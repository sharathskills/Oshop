import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService:UserService, private auth: AuthService, router: Router) {
    auth.Username$.subscribe(user=>
      {
        if(user){
          this.userService.save(user);
          let returnUrl= localStorage.getItem('returnUrl');
          if(returnUrl){
            router.navigateByUrl(returnUrl);
          }          
        }
      });
  }
}
