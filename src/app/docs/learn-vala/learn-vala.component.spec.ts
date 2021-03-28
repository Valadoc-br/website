import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnValaComponent } from './learn-vala.component';

describe('LearnValaComponent', () => {
  let component: LearnValaComponent;
  let fixture: ComponentFixture<LearnValaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnValaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnValaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
