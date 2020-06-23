import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasDetailComponent } from './ferias-detail.component';

describe('FeriasDetailComponent', () => {
  let component: FeriasDetailComponent;
  let fixture: ComponentFixture<FeriasDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeriasDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeriasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
