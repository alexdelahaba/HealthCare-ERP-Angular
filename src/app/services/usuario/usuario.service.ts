import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo.service';
import swal from 'sweetalert';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    public http: HttpClient,
    private router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }
  usuario: Usuario;
  token: string;
  menu: any = [];

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevaToken?token=' + this.token;
    return this.http.get(url);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token: token });
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario);
  }

  //==================================
  //Implementacion para el guard
  //==================================
  estaLogueado() {
    var token = localStorage.getItem('token') || '';
    return token.length > 10 ? true : false;
  }

  //==================================
  //LogOut
  //==================================
  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  //==================================
  // Cargar datos usuario
  //==================================
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  //==================================
  //Actualizar usuario
  //==================================
  actualizarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuario._id) {
      let usuarioDB: Usuario = usuario;
      this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
    }
    let url = URL_SERVICIOS + '/usuario/' + this.usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario);
  }

  //==================================
  //Guardar Storage
  //==================================
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario._id = id;
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this.token = token;
    this.menu = menu;
  }

  //==================================
  //Guardar solo token
  //==================================
  guardarTokenLocalStorage(token: string) {
    if (token === null || token === undefined || token === '') {
      return;
    }
    localStorage.setItem('token', token);
    swal('Token actualizado', 'success');
  }

  cambiarImagen(file: File, id: string) {
    this.subirArchivoService
      .subirArchivo(file, 'usuarios', id)
      .then((resp: any) => {
        console.log(resp);
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch((resp) => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    if (termino.length < 0) {
      this.cargarUsuarios();
      return;
    }
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url);
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);
  }
}
