import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDownloadsDialogComponent } from './multiple-downloads-dialog.component';

describe('MultipleDownloadsDialogComponent', () => {
  let component: MultipleDownloadsDialogComponent;
  let fixture: ComponentFixture<MultipleDownloadsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleDownloadsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleDownloadsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
