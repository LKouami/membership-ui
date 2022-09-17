import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuneDialogComponent } from './commune-dialog.component';

describe('CommuneDialogComponent', () => {
  let component: CommuneDialogComponent;
  let fixture: ComponentFixture<CommuneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommuneDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommuneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
