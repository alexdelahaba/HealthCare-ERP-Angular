import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  cambiarValor(valor: number) {
    if (this.progreso >= 100 || this.progreso <= 0) {
      return;
    }
    this.progreso += valor;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

  cambiarValorInput(evt: number) {
    if (evt >= 100) {
      this.progreso = 100;
    } else if (evt <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = evt;
    }
    this.txtProgress.nativeElement.value = Number(this.progreso);
    this.cambioValor.emit(this.progreso);
  }
}
