import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {
  
  // Waveform data for animations
  waveformBars: number[] = [];
  featureWaveformBars: number[] = [];
  
  constructor(private router: Router) {}
  
  public navTo(subUrl: string): void {
    this.router.navigate([subUrl]);
    console.log(subUrl);
  }

  public openPdf(): void {
    window.open('assets/david_schwendemann-klartext-jufo_arbeit.pdf', '_blank');
  }
  
}
