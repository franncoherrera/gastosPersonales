import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css',
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;
  totalEgresos: number = 0;
  totalIngresos: number = 0;

  private readonly store: Store<AppStateWithIngreso> = inject(Store<AppStateWithIngreso>);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.store
      .select('ingresosEgresos')
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(({ items }) => this.generarEstadisticas(items));
  }

  generarEstadisticas(items: IngresoEgreso[]) {
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
  }
}
