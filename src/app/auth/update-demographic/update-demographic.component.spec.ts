import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDemographicComponent } from './update-demographic.component';

describe('UpdateDemographicComponent', () => {
  let component: UpdateDemographicComponent;
  let fixture: ComponentFixture<UpdateDemographicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDemographicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDemographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
