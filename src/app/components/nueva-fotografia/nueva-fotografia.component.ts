import { Component, OnInit } from '@angular/core';
import { FotografiasService } from '../../services/fotografias.service';
import { AuthService } from '../../services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UploadService } from '../../services/upload.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nueva-fotografia',
  templateUrl: './nueva-fotografia.component.html',
  styleUrls: ['./nueva-fotografia.component.css']
})
export class NuevaFotografiaComponent implements OnInit {

  public fotografia: any = {};
  public token: string;
  public filesToUpload: Array<File>;
  public image_selected: string;
  public url: string;

  constructor(
    private fotografiaService: FotografiasService,
    private auth: AuthService,
    private uploadService: UploadService,
    private router: Router
  ) {
    this.token = this.auth.getToken();
    this.url = URL_SERVICIOS;
   }

  ngOnInit() {
  }

  agregar() {
    this.fotografia.usuario_creacion = this.auth.getIdentity().usuario;
    this.fotografiaService.save(this.fotografia, this.token)
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
        }
      }), catchError(err => {
        console.log(err);
        return throwError(err);
      });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files.length > 0 ? fileInput.target.files : null;
    this.image_selected = this.filesToUpload ? fileInput.target.files[0].name : '';
  }

}
