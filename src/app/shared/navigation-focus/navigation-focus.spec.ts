import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

import {NavigationFocusService} from './navigation-focus.service';
import {ElementRef} from '@angular/core';


describe('Navigation focus service', () => {
  let navigationFocusService: NavigationFocusService;
  let router: Router;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [NavigationFocusService]
      });
      router = TestBed.inject(Router);
    }
  );

  beforeEach(inject([NavigationFocusService], (nfs: NavigationFocusService) => {
    navigationFocusService = nfs;
  }));

  it('should set skip link href', () => {
    const div = document.createElement('div');
    div.id = 'skip-link-target';
    const element = new ElementRef(div);
    navigationFocusService.requestSkipLinkFocus(element);
    expect(navigationFocusService.getSkipLinkHref()).toBe('/#skip-link-target');
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
});
