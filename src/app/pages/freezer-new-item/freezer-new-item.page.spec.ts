import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreezerNewItemPage } from './freezer-new-item.page';

describe('FreezerNewItemPage', () => {
  let component: FreezerNewItemPage;
  let fixture: ComponentFixture<FreezerNewItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FreezerNewItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
