import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLabelsComponent } from './status-labels.component';

describe('StatusLabelsComponent', () => {
  let component: StatusLabelsComponent;
  let fixture: ComponentFixture<StatusLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
