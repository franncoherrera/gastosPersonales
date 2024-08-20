import {
  ApplicationRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { filter, first, Observable, switchMap, tap } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrl: './dashoard.component.css',
})
export class DashoardComponent implements OnInit {
  ingresoEgreso$: Observable<IngresoEgreso>;

  private readonly store: Store<AppState> = inject(Store<AppState>);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private readonly ingresoEgresoService: IngresoEgresoService =
    inject(IngresoEgresoService);

  constructor(private authService: AuthService) {
    this.authService.initAuthListener();
  }

  ngOnInit(): void {
    this.ingresoEgreso$ = this.store.select('user').pipe(
      takeUntilDestroyed(this.destroy),
      filter(({ user }) => user != null),
      switchMap(({ user }) =>
        this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
      ),
      tap((itemsFromFirebaseArray) =>
        this.store.dispatch(setItems({ items: itemsFromFirebaseArray }))
      )
    );
  }
}
