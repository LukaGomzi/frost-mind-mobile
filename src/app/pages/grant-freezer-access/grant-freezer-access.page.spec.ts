import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrantFreezerAccessPage } from './grant-freezer-access.page';

describe('GrantFreezerAccessPage', () => {
  let component: GrantFreezerAccessPage;
  let fixture: ComponentFixture<GrantFreezerAccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GrantFreezerAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
