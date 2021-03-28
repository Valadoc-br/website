import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrariesAndApisComponent } from './libraries-and-apis.component';

describe('LibrariesAndApisComponent', () => {
  let component: LibrariesAndApisComponent;
  let fixture: ComponentFixture<LibrariesAndApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrariesAndApisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrariesAndApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
