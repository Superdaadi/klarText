import { Component } from '@angular/core';



import { SentenceItem } from '../simplify-ai.model';
import data from '../../../data/request.json'
import { BoldTextPipe } from '../../../pipes/bold-text.pipe';




@Component({
  selector: 'app-sumplify-ai-results',
  standalone: true,
  imports: [BoldTextPipe],
  templateUrl: './sumplify-ai-results.component.html',
  styleUrl: './sumplify-ai-results.component.css'
})



export class SumplifyAiResultsComponent {
  
  protected data: SentenceItem[] = data as SentenceItem[];




  constructor() {}







}
