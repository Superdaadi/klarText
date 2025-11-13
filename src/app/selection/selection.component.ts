import { Component } from '@angular/core';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent {

  goToAi() {
    console.log('Navigating to simplifier…');
    // Router logic (optional)
  }

  record() {
    console.log('Recording speech…');
    // Microphone logic (optional)
  }
  
}
