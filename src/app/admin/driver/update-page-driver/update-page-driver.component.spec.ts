import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePageDriverComponent } from './update-page-driver.component';

describe('UpdatePageDriverComponent', () => {
  let component: UpdatePageDriverComponent;
  let fixture: ComponentFixture<UpdatePageDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePageDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePageDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
