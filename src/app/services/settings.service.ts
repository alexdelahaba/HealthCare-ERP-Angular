import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  ajustes: Ajustes = {
    // tema por defecto
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default',
  };
  constructor() {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    let datos = localStorage.getItem('ajustes');

    if (datos) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    } else {
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    }

    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(tema: string) {
    let url = `assets/css/colors/${tema}.css`;
    $('#tema').attr('href', url);
    this.ajustes.temaUrl = url;
    this.ajustes.tema = tema;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
