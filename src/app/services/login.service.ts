import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  login(usuario: any, getToken?: boolean): any {
    let url = URL_SERVICIOS + '/login';

    if (getToken) {
      usuario.token = getToken;
    }
    console.log(usuario);

    return this.http.post(url, usuario, {headers: this.headers}).toPromise()
    .then(res => res);
  }
}
