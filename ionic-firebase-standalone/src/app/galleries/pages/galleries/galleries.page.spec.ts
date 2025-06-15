import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleriesPage } from './galleries.page';

describe('GalleriesPage', () => {
  let component: GalleriesPage;
  let fixture: ComponentFixture<GalleriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
