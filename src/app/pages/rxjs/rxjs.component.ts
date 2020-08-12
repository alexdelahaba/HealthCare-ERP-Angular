import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscripcion: Subscription;

  constructor() {
    // this.subscripcion = this.devolverObservable().subscribe(
    //   (numero) => console.log(numero),
    //   (error) => console.log('error en el observador', error),
    //   () => console.log('se ha ejecutado la funcion complete')
    // );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.subscripcion.unsubscribe();
  }

  devolverObservable(): Observable<any> {
    return new Observable((observer) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador,
        };
        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('error lanzado');
        // }
      }, 500);
    })
      .pipe(retry(2))
      .pipe(
        map((resp: any) => {
          return resp.valor;
        })
      )
      .pipe(
        filter((valor, index) => {
          // console.log(valor, index);

          if (valor % 2 === 1) {
            //es impar
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
