import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso',
  standalone: true,
})
export class OrdenIngresoPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    // Crear una copia del array para evitar modificar el original
    const sortedItems = [...items].sort((a, b) => {
      if (a.tipo === 'ingreso' && b.tipo !== 'ingreso') {
        return -1;
      } else if (a.tipo !== 'ingreso' && b.tipo === 'ingreso') {
        return 1;
      } else {
        return 0;
      }
    });

    return sortedItems;
  }
}
