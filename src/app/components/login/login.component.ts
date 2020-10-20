import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }  

  ngOnInit(): void {
    if(localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      this.router.navigate(['home']);
    }
  }

  user = { 
    username: '',
    password: ''
  };

  public login() {
    this.loginService.login(this.user);
  }

  public recovery() {
    this.loginService.recovery(this.user.username);
  }
}
