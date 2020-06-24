import {Injectable} from '@angular/core';

export interface GuideItem {
  id: string;
  name: string;
  document: string;
  overview: string;
}

const GUIDES = [
  {
    id: 'getting-started',
    name: 'Getting started',
    document: '/docs-content/guides/getting-started.html',
    overview: 'Setup your Angular project to begin using Angular Material. Learn about' +
      ' prerequisites, installing Angular Material, and optionally displaying a sample material' +
      ' component in your application to verify your setup.'
  },
  {
    id: 'schematics',
    name: 'Schematics',
    document: '/docs-content/guides/schematics.html',
    overview: 'Angular Material comes packaged with Angular CLI schematics to make creating ' +
      'Material applications easier.'
  },
  {
    id: 'theming',
    name: 'Theming Angular Material',
    document: '/docs-content/guides/theming.html',
    overview: 'Define your own themes through Angular Material\'s tooling with Sass.'
  },
  {
    id: 'theming-your-components',
    name: 'Theming your own components',
    document: '/docs-content/guides/theming-your-components.html',
    overview: 'Define themes for your custom components.'
  },
  {
    id: 'typography',
    name: `Angular Material's Typography`,
    document: '/docs-content/guides/typography.html',
    overview: 'Angular Material\'s typography is based on the guidelines from  the Material' +
      ' Design spec and is arranged into typography levels'
  },
  {
    id: 'customizing-component-styles',
    name: 'Customizing component styles',
    document: '/docs-content/guides/customizing-component-styles.html',
    overview: 'Learn about view encapsulation, selector specificity, and component location when' +
      'customizing styles.'
  },
  {
    id: 'creating-a-custom-form-field-control',
    name: 'Custom form field control',
    document: '/docs-content/guides/creating-a-custom-form-field-control.html',
    overview: 'Custom form field controls can add additional logic to the existing form field' +
      ' component.'
  },
  {
    id: 'elevation',
    name: 'Elevation helpers',
    document: '/docs-content/guides/elevation.html',
    overview: 'Elevation classes and mixins allow you to add separation between elements along' +
      ' the z-axis'
  },
  {
    id: 'creating-a-custom-stepper-using-the-cdk-stepper',
    name: 'Custom stepper using the CdkStepper',
    document: '/docs-content/guides/creating-a-custom-stepper-using-the-cdk-stepper.html',
    overview: 'Build a custom stepper which you can completely style yourself without any' +
      ' specific Material Design styling.'
  },
  {
    id: 'using-component-harnesses',
    name: `Testing with component harnesses`,
    document: '/docs-content/guides/using-component-harnesses.html',
    overview: 'Use a component harness in your test to simulation interacts with a component the' +
      ' same way a user would.'
  }
];

@Injectable()
export class GuideItems {

  getAllItems(): GuideItem[] {
    return GUIDES;
  }

  getItemById(id: string): GuideItem | undefined {
    return GUIDES.find(i => i.id === id);
  }
}
