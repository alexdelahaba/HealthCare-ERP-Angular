import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.sincronizarCheck();
  }

  cambiarColor(color: string, link: any) {
    this.aplicarCheck(link);
    this.settingsService.aplicarTema(color);
  }

  aplicarCheck(link) {
    let selectores: any = document.getElementsByClassName('selector');
    for (let item of selectores) {
      item.classList.remove('working');
    }
    link.classList.add('working');
  }

  sincronizarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this.settingsService.ajustes.tema;
    for (const item of selectores) {
      if (item.getAttribute('data-theme') === tema) {
        item.classList.add('working');
        break;
      }
    }
  }
}
