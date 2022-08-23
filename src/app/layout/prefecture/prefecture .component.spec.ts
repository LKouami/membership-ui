import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefectureComponent } from './prefecture.component';

describe('PrefectureComponent', () => {
  let component: PrefectureComponent;
  let fixture: ComponentFixture<PrefectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefectureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
