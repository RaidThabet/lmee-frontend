import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDrawer } from './schedule-drawer';

describe('ScheduleDrawer', () => {
  let component: ScheduleDrawer;
  let fixture: ComponentFixture<ScheduleDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleDrawer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isVisible', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
