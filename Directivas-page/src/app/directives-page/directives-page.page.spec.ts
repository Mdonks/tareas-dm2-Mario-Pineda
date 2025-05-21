import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesPagePage } from './directives-page.page';

describe('DirectivesPagePage', () => {
  let component: DirectivesPagePage;
  let fixture: ComponentFixture<DirectivesPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectivesPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
