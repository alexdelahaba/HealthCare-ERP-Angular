import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
  ],
  imports: [CommonModule, RouterModule, PipesModule],
  exports: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
  ],
})
export class SharedModule {}
