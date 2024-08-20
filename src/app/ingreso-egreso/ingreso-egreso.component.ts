import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingreso-egreso',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './ingreso-egreso.component.html',
})
export class IngresoEgresoComponent implements OnInit {
  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean;
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly ingresoEgresoService: IngresoEgresoService =
    inject(IngresoEgresoService);

  private readonly store: Store<AppState> = inject(Store<AppState>);

  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.store
      .select('ui')
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(({ isLoading }) => {
        this.loading = isLoading;
      });
  }

  guardar(): void {
    if (this.ingresoForm.invalid) return;
    this.store.dispatch(isLoading());
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso: IngresoEgreso = new IngresoEgreso(
      descripcion,
      monto,
      this.tipo
    );
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(stopLoading());
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', error.message, 'error');
      });
  }
}
