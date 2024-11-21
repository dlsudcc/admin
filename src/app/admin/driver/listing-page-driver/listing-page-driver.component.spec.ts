import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPageDriverComponent } from './listing-page-driver.component';

describe('ListingPageDriverComponent', () => {
  let component: ListingPageDriverComponent;
  let fixture: ComponentFixture<ListingPageDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingPageDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingPageDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
