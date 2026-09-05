import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEvent } from './match-event';

describe('MatchEvent', () => {
  let component: MatchEvent;
  let fixture: ComponentFixture<MatchEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchEvent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchEvent);
    fixture.componentRef.setInput('event', {
      sequenceNumber: 1,
      type: 'GOAL_SCORED',
      minute: 23,
      isHomeClub: true,
      playerName: 'A. Player',
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders minute and label', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain("23'");
    expect(text).toContain('Goal');
    expect(text).toContain('A. Player');
  });
});
