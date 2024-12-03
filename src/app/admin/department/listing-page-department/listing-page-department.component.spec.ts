import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPageDepartmentComponent } from './listing-page-department.component';

describe('ListingPageDepartmentComponent', () => {
  let component: ListingPageDepartmentComponent;
  let fixture: ComponentFixture<ListingPageDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingPageDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingPageDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
