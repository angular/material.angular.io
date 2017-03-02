import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {ViewChild, Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MaterialModule} from '@angular/material';

import {FocusElementDirective} from './focus-element';


@Component({
  selector: 'test-component',
  template: '<h1 focusElement>Whoa!</h1>'
})
class TestComponent {
}


describe('FocusElementDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [FocusElementDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
  }));

  it('should set the tabindex of the host component to 0', () => {
    fixture.detectChanges();
    const tabindex = fixture
      .nativeElement
      .querySelector('h1')
      .getAttribute('tabindex');
    expect(tabindex).toEqual('0');
  });

  it('should call focus to the host components nativeElement', () => {
    const el = fixture.nativeElement.querySelector('h1');
    spyOn(el, 'focus');
    fixture.detectChanges();
    expect(el).not.toBeNull();
    expect(el.focus).toHaveBeenCalled();
  });
});
