import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPageUserComponent } from './show-page-user.component';

describe('ShowPageUserComponent', () => {
  let component: ShowPageUserComponent;
  let fixture: ComponentFixture<ShowPageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPageUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
