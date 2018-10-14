import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimMainLayoutComponent } from './sim-main-layout.component';

describe('SimMainLayoutComponent', () => {
  let component: SimMainLayoutComponent;
  let fixture: ComponentFixture<SimMainLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimMainLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
