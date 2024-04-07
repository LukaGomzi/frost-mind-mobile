import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageFoodTypesPage } from './manage-food-types.page';

describe('ManageFoodTypesPage', () => {
  let component: ManageFoodTypesPage;
  let fixture: ComponentFixture<ManageFoodTypesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageFoodTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
