import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatardialogComponent } from './avatardialog.component';

describe('AvatardialogComponent', () => {
  let component: AvatardialogComponent;
  let fixture: ComponentFixture<AvatardialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatardialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatardialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
