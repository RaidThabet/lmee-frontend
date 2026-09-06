import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Toolbar } from '@openng/optimus-ui/toolbar';
import { Button } from '@openng/optimus-ui/button';
import { Auth } from './auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar, Button],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  auth = inject(Auth);

  router = inject(Router);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
