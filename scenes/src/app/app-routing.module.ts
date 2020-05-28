import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InputPage} from './pages/input';
import {ButtonPage} from './pages/button';


const routes: Routes = [
  {path: 'input', component: InputPage},
  {path: 'button', component: ButtonPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
