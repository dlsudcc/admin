import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPageDriverComponent } from './add-page-driver.component';

describe('AddPageDriverComponent', () => {
  let component: AddPageDriverComponent;
  let fixture: ComponentFixture<AddPageDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPageDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPageDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
