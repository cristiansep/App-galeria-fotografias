import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FotografiasService {

  // public token: string;

  // headers: HttpHeaders = new HttpHeaders({
  //   'Authorization': this.token
  // });

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getFotografias() {
    let url = URL_SERVICIOS + '/fotografias';
    return this.http.get(url).toPromise().then(res => res);
  }

  getFotografiasById(id: number) {
    let url = URL_SERVICIOS + '/fotografia/' + id;
    return this.http.get(url).toPromise().then(res => res);
  }

  getFotografiasAdmin(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    let url = URL_SERVICIOS + '/fotografias-admin';
    return this.http.get(url, { 'headers': headers });

  }

  save(fotografia: any, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    let url = URL_SERVICIOS + '/fotografia';
    return this.http.post(url, fotografia, { 'headers': headers }).toPromise().then(res => res);

  }

  update(id: number, fotografia: any, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    let url = URL_SERVICIOS + '/fotografia/' + id;
    return this.http.post(url, fotografia, { 'headers': headers }).toPromise().then(res => res);

  }




}
