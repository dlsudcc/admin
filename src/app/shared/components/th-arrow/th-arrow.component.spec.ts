import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThArrowComponent } from './th-arrow.component';

describe('ThArrowComponent', () => {
  let component: ThArrowComponent;
  let fixture: ComponentFixture<ThArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThArrowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
