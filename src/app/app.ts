import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Matches } from './matches/matches';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Matches],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
