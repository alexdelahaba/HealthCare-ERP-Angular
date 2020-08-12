import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';

import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/hospital/hospital.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  totalHospitales: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(() =>
      this.cargarHospitales()
    );
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(termino).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.totalHospitales = resp.total;
      this.hospitales = resp.hospitales;
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService
      .actualizarHospital(hospital)
      .subscribe((resp: any) => {
        swal('Hospital Actualiado', hospital.nombre, 'success');
      });
  }

  borrarHospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id).subscribe(() => {
      this.cargarHospitales();
      swal('Hospital Borrado', 'Eliminado correctamente', 'success');
    });
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor).subscribe(() => {
        this.cargarHospitales();
        swal('Hospital Creado', valor, 'success');
      });
    });
  }

  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }
}
