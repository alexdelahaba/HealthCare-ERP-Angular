import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this.usuarioService.actualizarUsuario(usuario).subscribe((resp: any) => {
      this.usuarioService.guardarStorage(
        resp.usuario._id,
        localStorage.getItem('token'),
        usuario,
        resp.menu
      );
      swal('Usuario actualizado', usuario.nombre, 'success');
    });
  }

  seleccionImage(file: File) {
    if (!file) {
      this.imagenSubir = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo no es una imagen válida', 'warning');
      this.imagenSubir = null;
      return;
    }

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };

    this.imagenSubir = file;
  }

  cambiarImagen() {
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
