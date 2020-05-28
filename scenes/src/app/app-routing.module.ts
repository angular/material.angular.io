import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InputPage} from './pages/input';
import {ButtonPage} from './pages/button';
import {CheckboxPage} from './pages/checkbox';
import {DatepickerPage} from './pages/datepicker';


const routes: Routes = [
  {path: 'input', component: InputPage},
  {path: 'button', component: ButtonPage},
  {path: 'checkbox', component: CheckboxPage},
  {path: 'datepicker', component: DatepickerPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
