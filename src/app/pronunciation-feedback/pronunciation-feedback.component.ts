import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PronunciationService } from './pronunciation-feedback.service';
import { Phoneme, Metadata, PronunciationFeedback } from './pronunciation-feedback.model'



@Component({
  selector: 'app-pronunciation-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pronunciation-feedback.component.html',
  styleUrls: ['./pronunciation-feedback.component.css']
})

export class PronunciationFeedbackComponent {

  data: PronunciationFeedback | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private pronunciationService: PronunciationService
  ) {}

  ngOnInit() {
    console.log("Das ist die Data:")
    this.route.paramMap
      .pipe(
        switchMap(params => {
          console.log("Das ist die Data:")
          const id = params.get('id');
          if (!id) {
            this.error = true;
            throw new Error('No ID provided');
          }
          return this.pronunciationService.getResultById(id);
        })
      )
      .subscribe({
        next: (data: PronunciationFeedback) => {
          console.log("Das ist die Data: " + data)
          this.data = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = true;
          this.loading = false;
          this.router.navigate(['/selection']);
        }
      });
  }

  getScoreColor(score: number): string {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#3b82f6';
    if (score >= 70) return '#f59e0b';
    if (score >= 60) return '#f97316';
    return '#ef4444';
  }

  getGradeColor(grade: string): string {
    const gradeMap: { [key: string]: string } = {
      'A': '#10b981',
      'B': '#3b82f6',
      'C': '#f59e0b',
      'D': '#f97316',
      'F': '#ef4444'
    };
    return gradeMap[grade] || '#6b7280';
  }

  getDifficultyBadge(difficulty?: string): string {
    const difficultyMap: { [key: string]: string } = {
      'easy': 'Leicht',
      'medium': 'Mittel',
      'hard': 'Schwer'
    };
    return difficultyMap[difficulty || ''] || '';
  }
}
