import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeVidComponent } from './revoke-vid.component';

describe('RevokeVidComponent', () => {
  let component: RevokeVidComponent;
  let fixture: ComponentFixture<RevokeVidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevokeVidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokeVidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
