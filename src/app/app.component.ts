import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ejemplo1Component } from "./formulario/ejemplo1/ejemplo1.component";
import { ZodiacoComponent } from "./auth/features/zodiaco/zodiaco.component";
import { EmpleadosComponent } from "./auth/features/empleados/empleados.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ejemplo1Component, ZodiacoComponent,EmpleadosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
