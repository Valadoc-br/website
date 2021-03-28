import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValaAppsWithGtkComponent } from './vala-apps-with-gtk.component';

describe('ValaAppsWithGtkComponent', () => {
  let component: ValaAppsWithGtkComponent;
  let fixture: ComponentFixture<ValaAppsWithGtkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValaAppsWithGtkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValaAppsWithGtkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
