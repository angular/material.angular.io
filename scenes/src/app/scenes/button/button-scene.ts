import {Component, NgModule, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'button-scene',
  templateUrl: './button-scene.html',
  styleUrls: ['./button-scene.scss']
})
export class ButtonScene {
}

@NgModule({
  imports: [
    MatButtonModule,
  ],
  exports: [ButtonScene],
  declarations: [ButtonScene]
})
export class ButtonSceneModule {
}

