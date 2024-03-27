import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFoodTypePage } from './add-food-type.page';

describe('AddFoodTypePage', () => {
  let component: AddFoodTypePage;
  let fixture: ComponentFixture<AddFoodTypePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddFoodTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
