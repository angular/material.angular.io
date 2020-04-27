import {async, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

import {MATERIAL_DOCS_ROUTES} from '../../routes';
import {NavigationFocusService} from './navigation-focus.service';
import {ElementRef} from '@angular/core';


describe('Navigation focus service', () => {
  let navigationFocusService: NavigationFocusService;
  let router: Router;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(MATERIAL_DOCS_ROUTES)],
        providers: [NavigationFocusService]
      });
      router = TestBed.inject(Router);
    }
  );

  beforeEach(inject([NavigationFocusService], (nfs: NavigationFocusService) => {
    navigationFocusService = nfs;
  }));

  it('should set skip link href', () => {
    const div1 = document.createElement('div');
    div1.id = 'skip-link-target-1';
    const element1 = new ElementRef(div1);

    const div2 = document.createElement('div');
    div2.id = 'skip-link-target-2';
    const element2 = new ElementRef(div2);

    navigationFocusService.requestSkipLinkFocus(element1);
    navigationFocusService.requestSkipLinkFocus(element2);

    expect(navigationFocusService.getSkipLinkHref()).toEqual('/#skip-link-target-2');

    navigationFocusService.relinquishSkipLinkFocusOnDestroy(element2);

    expect(navigationFocusService.getSkipLinkHref()).toEqual('/#skip-link-target-1');
  });

  it('should be within component view', () => {
    const previousUrl = '/components/autocomplete/overview';
    const newUrl = '/components/autocomplete/overview#simple-autocomplete';
    expect(navigationFocusService.isNavigationWithinComponentView(previousUrl, newUrl)).toBeTrue();
  })

  it('should not be within component view', () => {
    const previousUrl = '/cdk/clipboard/overview';
    const newUrl = '/cdk/categories';
    expect(navigationFocusService.isNavigationWithinComponentView(previousUrl, newUrl)).toBeFalse();
  })

  it('should focus on component then relinquish focus', async(async () => {
    const div = document.createElement('div');
    div.id = 'focus-target';
    const element = new ElementRef(div);

    navigationFocusService.requestFocusOnNavigation(element);

    await router.navigateByUrl('/');
    expect(document.activeElement).not.toEqual(element.nativeElement);

    await router.navigateByUrl('/guides');
    expect(document.activeElement).toEqual(element.nativeElement);

    navigationFocusService.relinquishFocusOnDestroy(element);

    await router.navigateByUrl('/cdk');
    expect(document.activeElement).not.toEqual(element.nativeElement);
  }))
});
