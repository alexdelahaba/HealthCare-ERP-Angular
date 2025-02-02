import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.css'],
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  constructor(public usuarioService: UsuarioService, public router: Router) {}

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false),
      },
      { validators: this.sonIguales('password', 'password2') }
    );

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true,
    });
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones de uso', 'warning');
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario).subscribe(
      (resp: any) => {
        swal('Usuario creado', resp.usuario.email, 'success');
        this.router.navigate(['/login']);
      },

      // Gestion de errores en el subscribe, este es el unico ejemplo que voy a hacer, es siempre y todo igual
      (err) => {
        console.log(err);
        swal('Error' + err.status, err.error.mensaje, 'error');
      }
    );
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        //esto significa que pasa
        return null;
      }
      return {
        //no es intuitivo pero esto es el error
        sonIguales: true,
      };
    };
  }
}
