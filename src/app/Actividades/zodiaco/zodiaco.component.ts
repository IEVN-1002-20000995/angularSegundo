// actividades/zodiaco/zodiaco.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.component.html'
})
export class ZodiacoComponent {
  formGroup: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      anio: [''],
      sexo: ['']
    });
  }

  subImprimir() {
    const { nombre, apaterno, amaterno, dia, mes, anio } = this.formGroup.value;
    const edad = this.calcularEdad(dia, mes, anio);
    const signo = this.obtenerSignoZodiacal(dia, mes);

    this.mensaje = `
      Hola, ${nombre} ${apaterno} ${amaterno}.
      Tienes ${edad} años.
      Tu signo zodiacal es: ${signo}.
    `;
  }

  calcularEdad(dia: number, mes: number, anio: number): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - anio;
    if (hoy.getMonth() + 1 < mes || (hoy.getMonth() + 1 === mes && hoy.getDate() < dia)) {
      edad--;
    }
    return edad;
  }

  obtenerSignoZodiacal(dia: number, mes: number): string {
    const signos = [
      ['Capricornio', 1, 19], ['Acuario', 1, 20], ['Piscis', 2, 19], ['Aries', 3, 21],
      ['Tauro', 4, 20], ['Géminis', 5, 21], ['Cáncer', 6, 21], ['Leo', 7, 23],
      ['Virgo', 8, 23], ['Libra', 9, 23], ['Escorpio', 10, 23], ['Sagitario', 11, 22],
      ['Capricornio', 12, 22]
    ];

    const signo = signos.find(([_, mesInicio, diaInicio], index) =>
      (mes === mesInicio && dia >= diaInicio) ||
      (mes === mesInicio + 1 && dia <= signos[(index + 1) % signos.length][2])
    );

    return signo ? signo[0] : '';
  }
}
