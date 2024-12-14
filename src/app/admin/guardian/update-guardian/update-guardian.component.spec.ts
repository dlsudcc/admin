import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGuardianComponent } from './update-guardian.component';

describe('UpdateGuardianComponent', () => {
  let component: UpdateGuardianComponent;
  let fixture: ComponentFixture<UpdateGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGuardianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
