import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { OrdenIngresoPipe } from '../../pipes/ordern-ingreso.pipe';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, OrdenIngresoPipe],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent implements OnInit {
  ingresosEgresosItems: IngresoEgreso[] = [];

  private readonly store: Store<AppStateWithIngreso> = inject(Store<AppStateWithIngreso>);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private readonly ingresoEgresoService: IngresoEgresoService =
    inject(IngresoEgresoService);

  ngOnInit(): void {
    this.store
      .select('ingresosEgresos')
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(({ items }) => (this.ingresosEgresosItems = items));
  }

  borrar(uid: string) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }
}
