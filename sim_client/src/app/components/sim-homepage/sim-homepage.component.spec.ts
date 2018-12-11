import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimHome } from './sim-homepage.component';

describe('SimHome', () => {
  let component: SimHome;
  let fixture: ComponentFixture<SimHome>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimHome ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
