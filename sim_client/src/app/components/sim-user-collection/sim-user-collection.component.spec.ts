import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimUserCollectionComponent } from './sim-user-collection.component';

describe('SimUserCollectionComponent', () => {
  let component: SimUserCollectionComponent;
  let fixture: ComponentFixture<SimUserCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimUserCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimUserCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
