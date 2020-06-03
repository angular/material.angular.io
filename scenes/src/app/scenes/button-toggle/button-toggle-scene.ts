import {Component, NgModule, ViewEncapsulation} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-button-toggle-scene',
  templateUrl: './button-toggle-scene.html',
  styleUrls: ['./button-toggle-scene.scss']
})
export class ButtonToggleScene {}

@NgModule({
  imports: [
    MatButtonToggleModule,
  ],
  exports: [ButtonToggleScene],
  declarations: [ButtonToggleScene]
})
export class InputSceneModule {}

