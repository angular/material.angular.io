import {Component, NgModule, ViewEncapsulation} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-radio-scene',
  templateUrl: './radio-scene.html',
  styleUrls: ['./radio-scene.scss']
})
export class RadioScene {
}

@NgModule({
  imports: [
    MatIconModule,
    MatRadioModule,
  ],
  exports: [RadioScene],
  declarations: [RadioScene]
})
export class RadioSceneModule {
}

