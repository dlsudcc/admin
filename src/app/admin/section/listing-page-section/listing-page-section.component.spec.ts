import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPageSectionComponent } from './listing-page-section.component';

describe('ListingPageSectionComponent', () => {
  let component: ListingPageSectionComponent;
  let fixture: ComponentFixture<ListingPageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingPageSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingPageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
