import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';

import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';

import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe((params) => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService
      .cargarHospitales()
      .subscribe((resp: any) => (this.hospitales = resp.hospitales));

    this._modalUploadService.notificacion.subscribe((resp) => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe((resp: any) => {
      console.log(resp.medico);
      this.medico = resp.medico;
      this.medico.hospital = resp.medico.hospital;
      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe((resp: any) => {
      this.medico._id = resp.medico._id;
      swal('Cambio realizado con éxito', resp.medico.nombre, 'success');
      this.router.navigate(['/medico', resp.medico._id]);
    });
  }

  cambioHospital(id: string) {
    this._hospitalService
      .obtenerHospital(id)
      .subscribe((hospital: any) => (this.hospital = hospital));
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
