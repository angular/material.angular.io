import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.html',
  styleUrls: ['./help-support.scss']
})
export class HelpSupport {
}

@NgModule({
  exports: [HelpSupport],
  declarations: [HelpSupport],
})
export class HelpSupportModule {
}
