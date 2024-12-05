import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSectionComponent } from './show-section.component';

describe('ShowSectionComponent', () => {
  let component: ShowSectionComponent;
  let fixture: ComponentFixture<ShowSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
