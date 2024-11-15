import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePageStudentComponent } from './update-page-student.component';

describe('UpdatePageStudentComponent', () => {
  let component: UpdatePageStudentComponent;
  let fixture: ComponentFixture<UpdatePageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
