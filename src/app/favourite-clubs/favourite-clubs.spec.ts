import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteClubs } from './favourite-clubs';

describe('FavouriteClubs', () => {
  let component: FavouriteClubs;
  let fixture: ComponentFixture<FavouriteClubs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteClubs],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteClubs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
