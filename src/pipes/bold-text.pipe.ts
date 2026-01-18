import { Pipe, PipeTransform } from '@angular/core';

import { WordExpl } from '../service/responseData.model';


@Pipe({
  name: 'richText',
  standalone: true
})




export class BoldTextPipe implements PipeTransform {

  transform(text?: string, wordExpl?: WordExpl[]): string {
    if (!text) return '';

    let result = text;

    // 2️⃣ Wörter → Tooltip
    if (wordExpl?.length) {
      wordExpl.forEach(({ word, explanation }) => {
        const escapedWord = this.escapeRegex(word);
        const regex = new RegExp(`\\b(${escapedWord})\\b`, 'gi');

        result = result.replace(
          regex,
          `<span class="tooltip-word boldText">
             $1
             <span class="tooltip-box">${explanation}</span>
           </span>`
        );
      });
    }

    return result;
  }

  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }




}



