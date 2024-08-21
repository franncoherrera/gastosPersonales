import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, filter, map } from 'rxjs';
import { isLoading, stopLoading } from '../ui.actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  nombre: string;
  loading: boolean;
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly store: Store<AppState> = inject(Store<AppState>);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    combineLatest([this.store.select('user'), this.store.select('ui')])
      .pipe(
        takeUntilDestroyed(this.destroy),
        filter(([user, loading]) => user !== null && loading !== null)
      )
      .subscribe(([{ user }, loading]) => {
        this.nombre = user.nombre;
        this.loading = loading.isLoading;
      });
  }

  logOut() {
    this.store.dispatch(isLoading());
    this.authService
      .logOut()
      .then(() => {
        this.store.dispatch(stopLoading());
        this.router.navigate(['/login']);
      })
      .catch(() => this.store.dispatch(stopLoading()));
  }
}
