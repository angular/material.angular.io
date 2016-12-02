import {Component} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {AppModule} from '../../app-module';
import {By} from '@angular/platform-browser';


describe('ThemeChooser', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [
        ThemeChooserTestComponent,
      ],
    });

    TestBed.compileComponents();
  }));

  it('should have 4 themes', () => {
    let fixture = TestBed.createComponent(ThemeChooserTestComponent);
    let themes = fixture.debugElement.queryAll(By.css('.theme-chooser-swatch'));
    expect(themes.length).toBe(4);
  });
});


@Component({
  selector: 'test',
  template: '<theme-chooser></theme-chooser>'
})
class ThemeChooserTestComponent {};
