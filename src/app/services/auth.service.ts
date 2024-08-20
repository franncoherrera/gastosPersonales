import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  authState,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Usuario } from '../models/usuario.model';
import { unSetitems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: Usuario;

  get user(): Usuario {
    return { ...this._user };
  }

  private readonly firestore: Firestore = inject(Firestore);
  private readonly store: Store<AppState> = inject(Store<AppState>);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  auth = getAuth();
  authState$ = authState(this.auth);

  user$ = user(this.auth);

  initAuthListener() {
    this.authState$
      .pipe(
        takeUntilDestroyed(this.destroy),
        switchMap((aUser: Usuario) => {
          if (aUser) {
            return docData(doc(this.firestore, `${aUser.uid}/usuario`));
          } else {
            return of(null);
          }
        })
      )
      .subscribe(
        (fromFirebase) => {
          if (fromFirebase) {
            const user = Usuario.fromFirebase(fromFirebase);
            this._user = user;
            this.store.dispatch(setUser({ user }));
          } else {
            this._user = null;
            this.store.dispatch(unSetUser());
            this.store.dispatch(unSetitems());
          }
        },
        (error) => console.error(error)
      );
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        const dbPath = doc(this.firestore, `${user.uid}/usuario`);
        return setDoc(dbPath, { ...newUser });
      }
    );
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut() {
    this.store.dispatch(unSetUser());
    this.store.dispatch(unSetitems());
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.authState$.pipe(
      tap((aUser: Usuario) => {
        if (aUser) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
