import { Component } from '@angular/core';

import { SimplifiedText } from './../../../service/responseData.model';
import { SentenceItem } from '../simplify-ai.model';
import data from '../../../data/request.json'
import data2 from '../../../data/teset.json'
import { BoldTextPipe } from '../../../pipes/bold-text.pipe';
import { ResponseDataService } from '../../../service/responseData.service';





@Component({
  selector: 'app-sumplify-ai-results',
  standalone: true,
  imports: [
    BoldTextPipe
  ],
  templateUrl: './sumplify-ai-results.component.html',
  styleUrl: './sumplify-ai-results.component.css'
})



export class SumplifyAiResultsComponent {
  
  protected dataTest: SimplifiedText = data2;

  protected data?: SimplifiedText;



  constructor(private responseDataService: ResponseDataService) {
    this.data = this.responseDataService.getStoredData() ?? this.dataTest;
  }

}
