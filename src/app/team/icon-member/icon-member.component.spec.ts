import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMemberComponent } from './icon-member.component';

describe('IconMemberComponent', () => {
  let component: IconMemberComponent;
  let fixture: ComponentFixture<IconMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
