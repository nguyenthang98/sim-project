import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimDemoComponent } from './sim-demo.component';

describe('SimDemoComponent', () => {
  let component: SimDemoComponent;
  let fixture: ComponentFixture<SimDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
