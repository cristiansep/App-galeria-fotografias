import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FotografiasService } from '../../services/fotografias.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-editar-fotografia',
  templateUrl: './editar-fotografia.component.html',
  styleUrls: ['./editar-fotografia.component.css']
})
export class EditarFotografiaComponent implements OnInit {

  public fotografia: any = {};
  public image_selected: string;
  public token: string;
  public filesToUpload: Array<File>;

  constructor(
    private route: ActivatedRoute,
    private fotografiaService: FotografiasService,
    private auth: AuthService,
    private uploadService: UploadService,
    private router: Router
  ) {
    this.token = this.auth.getToken();
   }

  ngOnInit() {
    this.getFotografia();
  }

  getFotografia() {
      this.route.params.forEach((params: Params) => {
          this.fotografiaService.getFotografiasById(params[`id`])
          .then((resp: any) => {
            this.fotografia = resp.fotografia;
            this.image_selected = resp.fotografia.imagen;

          }), catchError(err => {
            // this.router.navigate(['/admin/list']);
            console.log(err);
            return throwError(err);
          });
      });
  }

  editar() {
    // this.fotografia.usuario_creacion = this.auth.getIdentity().usuario;
    this.fotografiaService.update(this.fotografia.id, this.fotografia, this.token)
      .then((resp: any) => {
        this.fotografia = resp.fotografia;
        if (this.filesToUpload) {
          this.uploadService.upload(URL_SERVICIOS + '/upload-fotografia/' + resp.fotografia.id, this.filesToUpload, this.token)
            .then(fotografias => {
              console.log(fotografias);
              this.router.navigate(['/admin/list']);

            }), catchError(err => {
              this.router.navigate(['/admin/list']);
              console.log(err);
              return throwError(err);
            });
        } else {
          this.router.navigate(['/admin/list']);
        }
      });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files.length > 0 ? fileInput.target.files : null;
    this.image_selected = this.filesToUpload ? fileInput.target.files[0].name : '';
  }



}
