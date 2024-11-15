import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPageStudentComponent } from './show-page-student.component';

describe('ShowPageStudentComponent', () => {
  let component: ShowPageStudentComponent;
  let fixture: ComponentFixture<ShowPageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
