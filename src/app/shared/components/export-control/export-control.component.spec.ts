import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportControlComponent } from './export-control.component';

describe('ExportControlComponent', () => {
  let component: ExportControlComponent;
  let fixture: ComponentFixture<ExportControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
