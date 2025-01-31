import { Routes } from "@angular/router";

export default[

{
 path:'sign-in'   ,
 loadComponent:()=>import('./sign-in/sign-in.component')
},
{
 path:'sign-up'   ,
 loadComponent:()=>import('./sign-up/sign-up.component')
},
{
 path:'zodiaco'   ,
 loadComponent:()=>import('./zodiaco/zodiaco.component')
},
{
 path:'empleados'   ,
 loadComponent:()=>import('./empleados/empleados.component')
},
{
 path:'ejemplo1'   ,
 loadComponent:()=>import('/Analitica/PWA-1002/angularSegundo/src/app/formulario/ejemplo1/ejemplo1.component')
}

] as Routes