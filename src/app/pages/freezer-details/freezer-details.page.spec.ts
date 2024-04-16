import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreezerDetailsPage } from './freezer-details.page';

describe('FreezerDetailsPage', () => {
  let component: FreezerDetailsPage;
  let fixture: ComponentFixture<FreezerDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FreezerDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
