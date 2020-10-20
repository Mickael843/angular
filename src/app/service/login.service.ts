import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: any) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(user)).subscribe(
      data => {
        // Retorno http
        var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

        localStorage.setItem("token", token);

        this.router.navigate(['home']);
      },
      error => {
        alert("Acesso negado!");
    });
  }

  recovery(username: any) {

    let user = new User();
    user.username = username;
    user.profession = undefined;
    console.info(JSON.stringify(user));
    return this.http.post(AppConstants.baseUrlPath + '/recovery', user).subscribe(
      data => {
        console.info('entrei na data');
        alert(JSON.parse(JSON.stringify(data)).error);
      },
      error => {
        alert("Error ao recuperar o login!");
    });
  }
}
