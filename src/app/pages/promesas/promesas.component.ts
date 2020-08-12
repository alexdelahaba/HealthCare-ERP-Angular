import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTres()
      .then((mensaje) => {
        console.log('Terminó', mensaje);
      })
      .catch((err) => {
        console.log('Error :(');
      });
  }

  ngOnInit(): void {}

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        console.log(contador);
        contador += 1;
        if (contador === 3) {
          resolve(true);
        }
        if (contador === 5) {
          // reject();
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
