import {Component, NgModule} from '@angular/core';
import {materialVersion} from '../version/version';
import { RouterModule } from '@angular/router';
import { MATERIAL_DOCS_ROUTES } from '../../routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {
  isNextVersion = location.hostname.startsWith('next.material.angular.io');

  version = materialVersion;
}


@NgModule({
  imports: [RouterModule.forRoot(MATERIAL_DOCS_ROUTES)],
  exports: [Footer],
  declarations: [Footer],
})
export class FooterModule {}
