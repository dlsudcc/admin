import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuardianComponent } from './add-guardian.component';

describe('AddGuardianComponent', () => {
  let component: AddGuardianComponent;
  let fixture: ComponentFixture<AddGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGuardianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
