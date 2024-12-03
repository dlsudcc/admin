import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPageDepartmentComponent } from './show-page-department.component';

describe('ShowPageDepartmentComponent', () => {
  let component: ShowPageDepartmentComponent;
  let fixture: ComponentFixture<ShowPageDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPageDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPageDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
