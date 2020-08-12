import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert';
declare function init_plugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string = '';
  auth2: any;
  usuario: Usuario;
  token: string;

  constructor(public router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    init_plugins();
    if (localStorage.getItem('email')) {
      this.recuerdame = true;
      this.email = localStorage.getItem('email');
    }

    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '964553348006-oqcpvihqnsmidaekvnoneikgbnahsvp2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe((resp: any) => {
        console.log(resp);

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        this.router.navigate(['/dashboard']);
        return true;
      });
    });
  }

  ingresar(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }

    let usuario = new Usuario(
      null,
      formulario.value.email,
      formulario.value.password
    );

    this.usuarioService.login(usuario, formulario.value.recuerdame).subscribe(
      (resp: any) => {
        console.log(resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        this.usuarioService.cargarStorage();

        this.router.navigate(['/dashboard']);
      },
      // Gestion de errores en el subscribe, este es el unico ejemplo que voy a hacer, es siempre y todo igual
      (err) => {
        console.log(err);
        swal('Error' + err.status, err.error.mensaje, 'error');
      }
    );

    // this.router.navigate(['/dashboard']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    this.usuario = usuario;
    this.token = token;
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
  }
}
