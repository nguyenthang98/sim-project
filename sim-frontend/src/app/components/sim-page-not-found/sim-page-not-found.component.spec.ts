import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimPageNotFoundComponent } from './sim-page-not-found.component';

describe('SimPageNotFoundComponent', () => {
  let component: SimPageNotFoundComponent;
  let fixture: ComponentFixture<SimPageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimPageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
