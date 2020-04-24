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
      router = TestBed.get(Router);
    }
  );

  beforeEach(inject([NavigationFocusService], (nfs: NavigationFocusService) => {
    navigationFocusService = nfs;
  }));

  it('should set skip link href', () => {
    const div = document.createElement("div");
    div.id = 'skip-link-target';
    const element = new ElementRef(div);
    navigationFocusService.requestSkipLinkFocus(element);
    expect(navigationFocusService.getSkipLinkHref()).toBe('/#skip-link-target');
  });
});
