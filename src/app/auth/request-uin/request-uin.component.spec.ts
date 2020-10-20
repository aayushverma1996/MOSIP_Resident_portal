import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUinComponent } from './request-uin.component';

describe('RequestUinComponent', () => {
  let component: RequestUinComponent;
  let fixture: ComponentFixture<RequestUinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestUinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestUinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
