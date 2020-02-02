import { Component, OnInit, Input } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-fotografia',
  templateUrl: './fotografia.component.html',
  styleUrls: ['./fotografia.component.css']
})
export class FotografiaComponent implements OnInit {

  @Input() fotografia: any;
  @Input() seleccionada: any;

  public url: string;

  constructor() {
    this.url = URL_SERVICIOS;
   }

  ngOnInit() {
  }

}
