import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SimplifyAiService } from './simplify-ai.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-simplify-ai',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './simplify-ai.component.html',
  styleUrl: './simplify-ai.component.css'
})
export class SimplifyAiComponent {

  languages: string[] = [
    'Deutsch',
    'Englisch',
    'Französisch'
  ]

  open: boolean[] = [false, false, false];
  selectedLabel: string[] = ['Mittel', 'false', 'detect'];


  constructor(private aiService: SimplifyAiService) {}


  toggle(type: number) {
    this.open.forEach((_, index) => {
      this.open[index] = index === type ? !this.open[index] : false;
    });
  }

  select(type: number, value: string) {
    this.open[type] = false;

    if (value === 'light') this.selectedLabel[type] = 'Leicht';
    if (value === 'average') this.selectedLabel[type] = 'Mittel';
    if (value === 'heavy') this.selectedLabel[type] = 'Stark';

    if (value === 'off') this.selectedLabel[type] = 'false';    
    if (value === 'on') this.selectedLabel[type] = 'true';

    if (type === 2) this.selectedLabel[type] = value;
  }


  @HostListener('document:click')
  close() {
    this.open.fill(false);
  }



  message = 'Was ist Jugend Forscht?';




  prompt = 'Was ist Jugend Forscht?';
  response = '';
  loading = false;


  send() {
    if (!this.message.trim()) return;

    this.loading = true;
    this.response = '';


    console.log(this.message)

    this.aiService.SendSimplifyRequest(
      this.message,
      this.selectedLabel[0].toLowerCase(),
      this.selectedLabel[1],
      this.selectedLabel[2],
    ).subscribe({
      next: result => {
        this.message = result.toString();
        console.log(this.message)
        this.loading = false;
      },
      error: () => {
        this.message = 'Something went wrong.';
        this.loading = false;
      }
    });
  }



}
