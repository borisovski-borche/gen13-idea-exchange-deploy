import { Component, signal } from '@angular/core';
import { Header } from './core/components/header/header';
import { RouterOutlet } from '@angular/router';
import { Spinner } from './core/components/spinner/spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, Header, Spinner],
})
export class App {
  protected readonly title = signal('client');
}
