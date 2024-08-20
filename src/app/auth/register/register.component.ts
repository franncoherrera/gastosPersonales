import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  loading: boolean;
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private readonly store: Store<AppState> = inject(Store<AppState>);

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.store
      .select('ui')
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((ui) => {
        this.loading = ui.isLoading;
      });
  }

  crearUsuario(): void {
    if (this.registroForm.invalid) return;
    const { nombre, correo, password } = this.registroForm.value;
    this.store.dispatch(ui.isLoading());
    this.authService
      .crearUsuario(nombre, correo, password)
      .then(() => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
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
