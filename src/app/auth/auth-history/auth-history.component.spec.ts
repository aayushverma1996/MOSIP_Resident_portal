import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHistoryComponent } from './auth-history.component';

describe('AuthHistoryComponent', () => {
  let component: AuthHistoryComponent;
  let fixture: ComponentFixture<AuthHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
