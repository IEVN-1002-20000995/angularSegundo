import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleados',
  standalone: true,
  templateUrl: './empleados.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class EmpleadosComponent implements OnInit {
  formGroup: FormGroup;
  empleados: any[] = [];
  mostrarTabla = false;  // Controla la visibilidad de la tabla
  editando = false;
  matriculaActual: string | null = null;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: [null, [Validators.required, Validators.min(18), Validators.max(65)]],
      horas: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    const data = localStorage.getItem('empleados');
    if (data) {
      this.empleados = JSON.parse(data);
    }
  }

  registrarEmpleado(): void {
    if (this.formGroup.invalid) return;

    const empleado = this.formGroup.value;

    if (this.editando) {
      this.actualizarEmpleado(empleado);
    } else {
      if (this.empleados.some(emp => emp.matricula === empleado.matricula)) {
        alert('La matrícula ya existe.');
        return;
      }
      this.empleados.push(empleado);
    }

    this.formGroup.reset();
    this.editando = false;
    this.guardarEnLocalStorage();
  }

  editarEmpleado(empleado: any): void {
    this.formGroup.patchValue(empleado);
    this.editando = true;
    this.matriculaActual = empleado.matricula;
  }

  actualizarEmpleado(empleado: any): void {
    const index = this.empleados.findIndex(emp => emp.matricula === this.matriculaActual);
    if (index !== -1) {
      this.empleados[index] = { ...empleado, matricula: this.matriculaActual }; // Asegúrate de mantener la matrícula
      this.guardarEnLocalStorage(); // Guarda los cambios
    }
  }
  

  calcularPagoHorasBase(horas: number): number {
    return Math.min(horas, 40) * 70;
  }

  calcularPagoHorasExtras(horas: number): number {
    return Math.max(horas - 40, 0) * 140;
  }

  calcularSubtotal(horas: number): number {
    return this.calcularPagoHorasBase(horas) + this.calcularPagoHorasExtras(horas);
  }

  calcularTotal(): number {
    return this.empleados.reduce((total, emp) => total + this.calcularSubtotal(emp.horas), 0);
  }

  eliminarEmpleado(matricula: string): void {
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
    this.guardarEnLocalStorage();
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  /* imprimirTabla(): void {
    const data = localStorage.getItem('empleados');
    this.empleados = data ? JSON.parse(data) : [];
    this.mostrarTabla = true;  // Muestra la tabla al imprimir
  } */

    imprimirTabla(): void {
      const data = localStorage.getItem('empleados');
      this.empleados = data ? JSON.parse(data) : [];
    
      // Ordena las matrículas numéricamente en orden ascendente
      this.empleados.sort((a, b) => +a.matricula - +b.matricula);
    
      this.mostrarTabla = true; // Muestra la tabla al imprimir
    }
    
}
