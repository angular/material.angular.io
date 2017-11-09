import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {ComponentCategoryList, ComponentCategoryListModule} from './component-category-list';
import {DocsAppTestingModule} from '../../testing/testing-module';
import {SECTIONS} from '../../shared/documentation-items/documentation-items';
import {ComponentPageTitle} from '../page-title/page-title';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

const COMPONENTS_SECTION = 'components';
const CDK_SECTION = 'cdk';

describe('ComponentCategoryList', () => {
  let fixture: ComponentFixture<ComponentCategoryList>;
  let componentPageTitle: ComponentPageTitle;
  let currentSectionId: BehaviorSubject<string>;

  beforeEach(async(() => {
    currentSectionId = new BehaviorSubject<string>(COMPONENTS_SECTION);
    const mockActivatedRoute = {
      pathFromRoot: [{
        params: currentSectionId.map(sectionId => {
          return { section: sectionId };
        })
      }]
    };

    TestBed.configureTestingModule({
      imports: [ComponentCategoryListModule, DocsAppTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(inject([ComponentPageTitle], (cpt: ComponentPageTitle) => {
    fixture = TestBed.createComponent(ComponentCategoryList);
    componentPageTitle = cpt;
  }));

  afterEach(() => {
    currentSectionId.complete();
  });

  it('should set up properties on init', () => {
    const component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.categories).toBeDefined();
  });

  it('should set the section', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.section).toEqual(COMPONENTS_SECTION);

    currentSectionId.next(CDK_SECTION);
    fixture.detectChanges();
    expect(component.section).toEqual(CDK_SECTION);
  });

  it('should set the title', () => {
    componentPageTitle.title = 'abc';
    fixture.detectChanges();
    expect(componentPageTitle.title).toEqual(SECTIONS[COMPONENTS_SECTION]);

    currentSectionId.next(CDK_SECTION);
    fixture.detectChanges();
    expect(componentPageTitle.title).toEqual(SECTIONS[CDK_SECTION]);
  });

  it('should render a card for every category', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const categories1 = component.docItems.getCategories(COMPONENTS_SECTION);
    const cards1 = fixture
      .nativeElement.querySelectorAll('.docs-component-category-list-card');
    expect(cards1.length).toEqual(categories1.length);

    currentSectionId.next(CDK_SECTION);
    fixture.detectChanges();
    const categories2 = component.docItems.getCategories(CDK_SECTION);
    const cards2 = fixture
      .nativeElement.querySelectorAll('.docs-component-category-list-card');
    expect(cards2.length).toEqual(categories2.length);
  });
});
