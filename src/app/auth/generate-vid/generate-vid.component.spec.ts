import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateVidComponent } from './generate-vid.component';

describe('GenerateVidComponent', () => {
  let component: GenerateVidComponent;
  let fixture: ComponentFixture<GenerateVidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateVidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateVidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
