import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodTypeDetailsPage } from './food-type-details.page';

describe('FoodTypeDetailsPage', () => {
  let component: FoodTypeDetailsPage;
  let fixture: ComponentFixture<FoodTypeDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FoodTypeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
