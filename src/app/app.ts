import { Component } from '@angular/core';
import { Calculator } from './calculator/calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Calculator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'calculator-app';
}