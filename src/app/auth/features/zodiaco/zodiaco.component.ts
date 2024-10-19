import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  templateUrl: './zodiaco.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class ZodiacoComponent implements OnInit {
  formGroup: FormGroup;
  mensaje: string | null = null;
  imagen: string | null = null;

  imagenes: { [key: string]: string } = {
    Rata: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbc_JtN7v6T6mSmHdtNQ1nf7KoCCO3Js2rLg&s',
    Buey: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg',
    Tigre: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Tigre.jpg',
    Conejo: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Conejo.jpg',
    Dragón: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Dragon.jpg',
    Serpiente: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Serpiente.jpg',
    Caballo: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg',
    Cabra: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cabra.jpg',
    Mono: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg',
    Gallo: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Gallo.jpg',
    Perro: 'https://studycli.org/wp-content/uploads/2021/06/chinese-new-year-year-of-the-dog-paper-cutting.jpeg',
    Cerdo: 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cerdo.jpg',
  };

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      dia: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      anio: [null, [Validators.required, Validators.min(1990)]],
      sexo: ['M', Validators.required],
    });
  }

  ngOnInit(): void {}

  subImprimir() {
    const { nombre, apellidoPaterno, apellidoMaterno, dia, mes, anio } = this.formGroup.value;
    const signo = this.obtenerZodiacoChino(anio);
    this.imagen = this.imagenes[signo];
    const edad = this.calcularEdad(anio, mes, dia);

    this.mensaje = `Hola, ${nombre} ${apellidoPaterno} ${apellidoMaterno}  Tu signo zodiacal chino es: ${signo}  Tu edad es: ${edad} años`;
  }

  obtenerZodiacoChino(anio: number): string {
    const signos = [
      'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente',
      'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'
    ];
    return signos[(anio - 4) % 12];
  }

  calcularEdad(anio: number, mes: number, dia: number): number {
    const fechaNacimiento = new Date(anio, mes - 1, dia);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (hoy < new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }
}
