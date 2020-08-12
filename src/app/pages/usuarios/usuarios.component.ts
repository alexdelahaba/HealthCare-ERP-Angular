import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(
    private usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe((resp) =>
      this.cargarUsuarios()
    );
  }
  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }
  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros || desde < 0) {
      return;
    } else {
      this.desde += valor;
      this.cargarUsuarios();
    }
  }

  buscarUsuario(termino: string) {
    console.log(termino);
    this.usuarioService.buscarUsuarios(termino).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      swal('No puede borrar su propio usuario', '', 'error');
      return;
    }
    swal('¿Estás seguro de borrar este usuario?', {
      buttons: {
        cancel: true,
        catch: {
          text: 'Aceptar',
        },
      },
    }).then((value) => {
      if (value) {
        this.usuarioService.borrarUsuario(usuario._id).subscribe((resp) => {
          swal(
            'Usuario borrado',
            'El usuario ha sido eliminado correctamente',
            'success'
          );
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
