import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly authService: AuthService = inject(AuthService);

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    delete ingresoEgreso.uid;
    const uid: string = this.authService.user.uid;
    const userDocRef = doc(this.firestore, `${uid}/ingresos-egresos`);
    const ingresosEgresosCollection = collection(userDocRef, 'items');
    return addDoc(ingresosEgresosCollection, { ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    const itemsCollection = collection(
      this.firestore,
      `${uid}/ingresos-egresos/items`
    );
    return collectionData(itemsCollection, { idField: 'uid' });
  }

  borrarIngresoEgreso(uidItem: string): Promise<void> {
    const uid: string = this.authService.user.uid;
    const userDocRef = doc(
      this.firestore,
      `${uid}/ingresos-egresos/items/${uidItem}`
    );
    return deleteDoc(userDocRef);
  }
}
