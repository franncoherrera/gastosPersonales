import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { DashoardComponent } from './dashoard.component';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from '../ingreso-egreso/ingreso-egreso.reducer';
export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashoardComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../ingreso-egreso/estadistica/estadistica.component').then(
            (estadistica) => estadistica.EstadisticaComponent
          ),
      },
      {
        path: 'ingreso-egreso',
        loadComponent: () =>
          import('../ingreso-egreso/ingreso-egreso.component').then(
            (ingresoEgreso) => ingresoEgreso.IngresoEgresoComponent
          ),
      },
      {
        path: 'detalle',
        loadComponent: () =>
          import('../ingreso-egreso/detalle/detalle.component').then(
            (detalle) => detalle.DetalleComponent
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [DashoardComponent],
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    RouterModule,
    RouterModule.forChild(dashboardRoutes),
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),

  ],
})
export class DashboardModule {}
