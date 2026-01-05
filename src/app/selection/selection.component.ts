import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent {

  constructor(private router: Router) {

  }

  goToAi() {
    console.log('Navigating to simplifier…');
    this.router.navigate(['/simplify-ai'])
    // Router logic (optional)
  }

  record() {
    console.log('Recording speech…');
    // Microphone logic (optional)
  }
  
}
