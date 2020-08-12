import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit {
  label: string = '';
  constructor(
    private router: Router,
    public tituloPagina: Title,
    public meta: Meta
  ) {
    this.getDatosRoute();
  }

  getDatosRoute() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof ActivationEnd && event.snapshot.firstChild === null
        )
      )
      .pipe(
        map((evento: ActivatedRoute) => {
          return evento.snapshot.data;
        })
      )
      .subscribe((dato) => {
        this.label = dato.titulo;
        this.tituloPagina.setTitle(this.label);
        let metaRag: MetaDefinition = {
          name: 'description',
          content: this.label,
        };
        this.meta.updateTag(metaRag);
      });
  }

  ngOnInit(): void {}
}
