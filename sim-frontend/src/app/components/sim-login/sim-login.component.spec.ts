import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimLoginComponent } from './sim-login.component';

describe('SimLoginComponent', () => {
  let component: SimLoginComponent;
  let fixture: ComponentFixture<SimLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
