import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFreezerPage } from './add-freezer.page';

describe('AddFreezerPage', () => {
  let component: AddFreezerPage;
  let fixture: ComponentFixture<AddFreezerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddFreezerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
