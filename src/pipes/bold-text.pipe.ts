import { Pipe, PipeTransform } from '@angular/core';

import { WordExpl } from './bold-text.model';


@Pipe({
  name: 'richText',
  standalone: true
})




export class BoldTextPipe implements PipeTransform {

  transform(text?: string, wordExpl?: WordExpl[]): string {
    if (!text) return '';

    let result = text;

    // 1️⃣ **Text** → bold
    result = result.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="boldText">$1</strong>'
    );

    // 2️⃣ Wörter → Tooltip
    if (wordExpl?.length) {
      wordExpl.forEach(({ word, expl }) => {
        const escapedWord = this.escapeRegex(word);
        const regex = new RegExp(`\\b(${escapedWord})\\b`, 'gi');

        result = result.replace(
          regex,
          `<span class="tooltip-word">
             $1
             <span class="tooltip-box">${expl}</span>
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



