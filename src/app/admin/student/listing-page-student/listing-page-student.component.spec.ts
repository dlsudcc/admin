import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPageStudentComponent } from './listing-page-student.component';

describe('ListingPageStudentComponent', () => {
  let component: ListingPageStudentComponent;
  let fixture: ComponentFixture<ListingPageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingPageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingPageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
