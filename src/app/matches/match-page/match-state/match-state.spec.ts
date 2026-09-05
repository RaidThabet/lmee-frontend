import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchState } from './match-state';

describe('MatchState', () => {
  let component: MatchState;
  let fixture: ComponentFixture<MatchState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchState],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
