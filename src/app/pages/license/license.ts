import { Component, NgModule } from "@angular/core";
import { FooterModule } from "../../shared/footer/footer";

@Component({
    selector: 'app-license',
    templateUrl: './license.html',
    styleUrls: ['./license.scss']
})
export class License {}

@NgModule({
    imports: [FooterModule],
    exports: [License],
    declarations: [License],
})
export class LicenseModule {}