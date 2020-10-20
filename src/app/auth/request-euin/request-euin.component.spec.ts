import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEuinComponent } from './request-euin.component';

describe('RequestEuinComponent', () => {
  let component: RequestEuinComponent;
  let fixture: ComponentFixture<RequestEuinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestEuinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestEuinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
