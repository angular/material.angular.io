import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HelpSupport} from './help-support';

describe('HelpSupportComponent', () => {
  let component: HelpSupport;
  let fixture: ComponentFixture<HelpSupport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpSupport]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpSupport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
