import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefectureDialogComponent } from './prefecture-dialog.component';

describe('PrefectureDialogComponent', () => {
  let component: PrefectureDialogComponent;
  let fixture: ComponentFixture<PrefectureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefectureDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefectureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
