import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReqStatusCheckComponent } from './service-req-status-check.component';

describe('ServiceReqStatusCheckComponent', () => {
  let component: ServiceReqStatusCheckComponent;
  let fixture: ComponentFixture<ServiceReqStatusCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceReqStatusCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceReqStatusCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
