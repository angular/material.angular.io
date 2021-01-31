import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.html',
  styleUrls: ['./support.scss']
})
export class Support {
}

@NgModule({
  exports: [Support],
  declarations: [Support],
})
export class SupportModule {
}
