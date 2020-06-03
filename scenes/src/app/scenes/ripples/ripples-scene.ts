import {Component, NgModule, ViewEncapsulation} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule} from '@angular/common';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-ripple-scene',
  templateUrl: './ripples-scene.html',
  styleUrls: ['./ripples-scene.scss']
})
export class RipplesScene {
  value = 'Clear me';
}

@NgModule({
  imports: [
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  exports: [RipplesScene],
  declarations: [RipplesScene]
})
export class InputSceneModule {}

