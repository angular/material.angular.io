import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {ButtonDemo} from '../../assets/examples/button-demo';
import {CheckboxDemo} from '../../assets/examples/checkbox-demo';


/**
 * The list of example components.
 * Key is the example name which will be used in `material-docs-example="key"`.
 * Value is the component.
 */

export const EXAMPLE_COMPONENTS =
{
  'buttonDemo': ButtonDemo,
  'checkboxDemo': CheckboxDemo,
};

/**
 * The list of all example components.
 * We need to put them in both `declarations` and `entryComponents` to make them work.
 */
const EXAMPLE_LIST = Object.keys(EXAMPLE_COMPONENTS).map((key) => EXAMPLE_COMPONENTS[key]);

@NgModule({
  declarations: EXAMPLE_LIST,
  entryComponents: EXAMPLE_LIST,
  imports: [
    MaterialModule.forRoot(),
  ]
})
export class ExampleModule { }
