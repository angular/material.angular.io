import {Component, NgModule, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellCssClasses, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-datepicker-scene',
  templateUrl: './datepicker-scene.html',
  styleUrls: ['./datepicker-scene.scss']
})
export class DatepickerScene {
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }
}

@NgModule({
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  exports: [DatepickerScene],
  declarations: [DatepickerScene],
})
export class DatepickerSceneModule {
}

