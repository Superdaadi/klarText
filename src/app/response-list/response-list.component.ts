import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-list.component.html',
  styleUrl: './response-list.component.css'
})
export class ResponseListComponent {
    responses: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadResponses();
  }

  loadResponses(): void {
    const key = 'responses';
    const existing = localStorage.getItem(key);
    this.responses = existing ? JSON.parse(existing) : [];
  }

  navigateToResult(response: any): void {
    this.router.navigate(['/pronunc-ai-result', response]);
  }

  deleteResponse(index: number, event: Event): void {
    // Verhindere Navigation beim Klick auf Löschen-Button
    event.stopPropagation();
    
    if (confirm('Möchten Sie diese Response wirklich löschen?')) {
      this.responses.splice(index, 1);
      localStorage.setItem('responses', JSON.stringify(this.responses));
    }
  }

  getResponsePreview(response: any): string {
    // Zeige eine Vorschau der Response
    if (typeof response === 'string') {
      return response.length > 100 ? response.substring(0, 100) + '...' : response;
    }
    if (response && typeof response === 'object') {
      const jsonStr = JSON.stringify(response);
      return jsonStr.length > 100 ? jsonStr.substring(0, 100) + '...' : jsonStr;
    }
    return 'Keine Vorschau verfügbar';
  }
}
