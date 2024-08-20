import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly store: Store<AppState> = inject(Store<AppState>);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.store
      .select('ui')
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((ui) => {
        this.loading = ui.isLoading;
      });
  }

  loginUser(): void {
    if (this.loginForm.invalid) return;
    this.store.dispatch(ui.isLoading());
    const { correo, password } = this.loginForm.value;
    this.authService
      .loginUsuario(correo, password)
      .then(() => {
        this.router.navigate(['/']);
        this.store.dispatch(ui.stopLoading());
      })
      .catch((error) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }
}
