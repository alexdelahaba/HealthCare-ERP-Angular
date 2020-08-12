import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from 'src/app/services/medico/medico.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalMedicos: number = 0;
  constructor(public _medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.totalMedicos = resp.total;
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos(termino).subscribe((resp: any) => {
      this.medicos = resp.medicos;
    });
  }

  borrarMedico(medico: Medico) {
    this._medicoService.borrarMedico(medico._id).subscribe(() => {
      this.cargarMedicos();
      swal('Médico Borrado', 'Médico borrado correctamente', 'success');
    });
  }
}
