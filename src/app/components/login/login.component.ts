import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: any = {};

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.usuario)
      .then(resp => {
        this.loginService.login(this.usuario, true)
          .then(respToken => {
            localStorage.setItem('user', JSON.stringify(resp.usuario));
            localStorage.setItem('token', respToken.token);
            this.router.navigate(['/admin/list']);
          }).catch(error => {
            console.log(error);
          });
      }).catch(error => {
        console.log(error);
      });
  }

}
