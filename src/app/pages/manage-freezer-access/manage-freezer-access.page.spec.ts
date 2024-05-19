import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageFreezerAccessPage } from './manage-freezer-access.page';

describe('ManageFreezerAccessPage', () => {
  let component: ManageFreezerAccessPage;
  let fixture: ComponentFixture<ManageFreezerAccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageFreezerAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
