import { Component, OnInit } from '@angular/core';
import { FotografiasService } from '../../services/fotografias.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Animations} from 'src/app/animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [Animations]
})
export class HomeComponent implements OnInit {

  public fotografias: any[];
  public url: string;
  public fotoSeleccionada: any = {};
  public verMas: boolean = false;
  public fotoActual: number = 0;
  public direccion: string;
  public show_thumbs: boolean = false;

  constructor(
    private fotografiaService: FotografiasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.url = URL_SERVICIOS;
  }

  ngOnInit() {
    this.getFotografias();
  }

  getFotografias() {
    this.fotografiaService.getFotografias()
      .then((resp: any) => {
        this.fotografias = resp.fotografias;
        this.route.params.forEach((params: Params) => {
          const num = params[`num`];
          this.fotoSeleccionada.fotografia = this.fotografias.find(result => {
            return result.numero === num;
          });
          if (!this.fotoSeleccionada.fotografia) {
            this.fotoSeleccionada.fotografia = this.fotografias[0];
          }
          const next = this.fotografias.indexOf(this.fotoSeleccionada.fotografia) + 1;
          const prev = this.fotografias.indexOf(this.fotoSeleccionada.fotografia) - 1;

          this.fotoSeleccionada.siguiente = next < this.fotografias.length ? this.fotografias[next].numero : null;
          this.fotoSeleccionada.anterior = prev >= 0 ? this.fotografias[prev].numero : null;

          this.moverFotografia(this.fotoSeleccionada.fotografia);

          console.log(this.fotoSeleccionada.fotografia);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  moverFotografia(fotografia: any) {
    this.show_thumbs = false;
    if (fotografia.numero > this.fotoActual) {
      this.direccion = 'right';
    } else if (fotografia.numero < this.fotoActual) {
      this.direccion = 'left';
    }

    this.fotoActual = fotografia.numero;
    this.router.navigate(['/home', this.fotoActual]);
  }


}
