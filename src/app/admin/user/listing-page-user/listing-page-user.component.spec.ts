import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPageUserComponent } from './listing-page-user.component';

describe('ListingPageUserComponent', () => {
  let component: ListingPageUserComponent;
  let fixture: ComponentFixture<ListingPageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingPageUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
