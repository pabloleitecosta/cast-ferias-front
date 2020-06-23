import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasListComponent } from './ferias-list.component';

describe('FeriasListComponent', () => {
  let component: FeriasListComponent;
  let fixture: ComponentFixture<FeriasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeriasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeriasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
