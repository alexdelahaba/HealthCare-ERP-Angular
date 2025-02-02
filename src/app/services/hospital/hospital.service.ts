import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {}

  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url);
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre });
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url);
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital);
  }
}
