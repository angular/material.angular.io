import {ComponentList} from './pages/component-list';
import {Routes} from '@angular/router';
import {
  ComponentApi,
  ComponentExamples,
  ComponentOverview,
  ComponentViewer
} from './pages/component-viewer/component-viewer';
import {ComponentCategoryList} from './pages/component-category-list/component-category-list';
import {ComponentSidenav} from './pages/component-sidenav/component-sidenav';
import {CanActivateComponentSidenav} from './pages/component-sidenav/component-sidenav-can-load-guard';

export const MATERIAL_DOCS_ROUTES: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: () => import('./pages/homepage').then(m => m.HomepageModule)
  },
  {path: 'categories', redirectTo: '/components/categories'},
  {
    path: 'guides',
    loadChildren: () => import('./pages/guide-list').then(m => m.GuideListModule)
  },
  // Since https://github.com/angular/components/pull/9574, the cdk-table guide became the overview
  // document for the cdk table. To avoid any dead / broken links, we redirect to the new location.
  {path: 'guide/cdk-table', redirectTo: '/cdk/table/overview'},
  {
    path: 'guide/:id',
    loadChildren: () => import('./pages/guide-viewer').then(m => m.GuideViewerModule)
  },
  {
    path: ':section',
    canActivate: [CanActivateComponentSidenav],
    component: ComponentSidenav,
    children: [
      {path: '', redirectTo: 'categories', pathMatch: 'full'},
      {path: 'component/:id', redirectTo: ':id', pathMatch: 'full'},
      {path: 'category/:id', redirectTo: '/categories/:id', pathMatch: 'full'},
      {
        path: 'categories',
        children: [
          {path: '', component: ComponentCategoryList},
          {path: ':id', component: ComponentList},
        ],
      },
      {
        path: ':id',
        component: ComponentViewer,
        children: [
          {path: '', redirectTo: 'overview', pathMatch: 'full'},
          {path: 'overview', component: ComponentOverview, pathMatch: 'full'},
          {path: 'api', component: ComponentApi, pathMatch: 'full'},
          {path: 'examples', component: ComponentExamples, pathMatch: 'full'},
          {path: '**', redirectTo: 'overview'},
        ],
      },
    ],
  },
  {path: '**', redirectTo: ''},
];
