import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBar, NavBarModule} from './navbar';
import {DocsAppTestingModule} from '../../testing/testing-module';


describe('NavBar', () => {
  let fixture: ComponentFixture<NavBar>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NavBarModule, DocsAppTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
  });

  it('should create components', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  // Note: Add tests as logic is added to navbar class.
});
