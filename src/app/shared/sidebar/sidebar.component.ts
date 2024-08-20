import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  nombre: string;

  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly store: Store<AppState> = inject(Store<AppState>);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.store
      .select('user')
      .pipe(
        takeUntilDestroyed(this.destroy),
        filter((user) => user !== null)
      )
      .subscribe(({ user }) => (this.nombre = user.nombre));
  }

  logOut() {
    this.authService.logOut().then(() => this.router.navigate(['/login']));
  }
}
