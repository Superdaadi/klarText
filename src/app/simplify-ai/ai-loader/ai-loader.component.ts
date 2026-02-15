import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-loader',
  standalone: true,
  imports: [],
  templateUrl: './ai-loader.component.html',
  styleUrl: './ai-loader.component.css'
})
export class AiLoaderComponent {
  loadingText = 'AI is thinking';
  dots = '';

  test = Math.random();

  
  constructor() {}
}
