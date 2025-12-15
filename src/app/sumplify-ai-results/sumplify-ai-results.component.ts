import { Component } from '@angular/core';

import data from '../../data/request.json'

@Component({
  selector: 'app-sumplify-ai-results',
  standalone: true,
  imports: [],
  templateUrl: './sumplify-ai-results.component.html',
  styleUrl: './sumplify-ai-results.component.css'
})
export class SumplifyAiResultsComponent {
  
  protected content: string[] = []



  constructor() {}


  getData() {
    this.content[0] = data.te.simplifyed
  }


}
