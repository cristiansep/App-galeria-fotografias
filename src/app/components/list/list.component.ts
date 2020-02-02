import { Component, OnInit } from '@angular/core';
import { FotografiasService } from '../../services/fotografias.service';
import { AuthService } from '../../services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { Animations } from '../../animations/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [Animations]
})
export class ListComponent implements OnInit {

  public token: string;
  public fotografias: any[];
  public url: string;

  constructor(
    private fotografiasService: FotografiasService,
    private authService: AuthService
  ) {
    this.token = this.authService.getToken();
    this.url = URL_SERVICIOS;
   }

  ngOnInit() {
     this.getFotografiasAdmin();
    // this.getFotografias();
  }

  getFotografiasAdmin() {
    this.fotografiasService.getFotografiasAdmin(this.token)
      .subscribe((resp: any) => {
        this.fotografias = resp.fotografias;
      }), catchError(err => {
        return throwError(err);
      });
  }

  // getFotografias() {
  //   this.fotografiasService.getFotografias()
  //     .subscribe((resp: any) => {
  //       this.fotografias = resp.fotografias;
  //       // console.log(this.fotografias);
  //       // console.log(this.token);
  //     }), catchError(err => {
  //       // console.log(err);
  //       return throwError(err);
  //     });
  // }


}
