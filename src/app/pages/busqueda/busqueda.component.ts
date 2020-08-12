import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.activatedRoute.params.subscribe((params) => {
      let termino = params['termino'];
      this.buscar(termino);
    });
  }

  ngOnInit(): void {}

  buscar(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios;
    });
  }
}
