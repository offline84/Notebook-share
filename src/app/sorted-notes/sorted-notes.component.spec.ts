import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedNotesComponent } from './sorted-notes.component';

describe('SortedNotesComponent', () => {
  let component: SortedNotesComponent;
  let fixture: ComponentFixture<SortedNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortedNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
