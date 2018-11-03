import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppControlPanelComponent } from './app-control-panel.component';

describe('AppControlPanelComponent', () => {
  let component: AppControlPanelComponent;
  let fixture: ComponentFixture<AppControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
