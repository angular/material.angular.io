import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InputScene} from './scenes/input/input-scene';
import {SceneViewer} from './scene-viewer/scene-viewer';
import {ButtonScene} from './scenes/button/button-scene';
import {CheckboxScene} from './scenes/checkbox/checkbox-scene';
import {DatepickerScene} from './scenes/datepicker/datepicker-scene';


const routes: Routes = [
  {path: 'button', component: SceneViewer, data: {hueRotate: 0, scene: ButtonScene}},
  {path: 'checkbox', component: SceneViewer, data: {hueRotate: 15, scene: CheckboxScene}},
  {path: 'datepicker', component: SceneViewer, data: {hueRotate: 30, scene: DatepickerScene}},
  {path: 'input', component: SceneViewer, data: {hueRotate: 45, scene: InputScene}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
