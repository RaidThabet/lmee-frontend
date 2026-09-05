import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSide } from './match-side';

describe('MatchSide', () => {
  let component: MatchSide;
  let fixture: ComponentFixture<MatchSide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchSide],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchSide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
