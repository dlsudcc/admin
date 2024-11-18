import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPageDriverComponent } from './show-page-driver.component';

describe('ShowPageDriverComponent', () => {
  let component: ShowPageDriverComponent;
  let fixture: ComponentFixture<ShowPageDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPageDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPageDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
