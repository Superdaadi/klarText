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



  messageA = 'Düsseldorf. Der US-Elektroautobauer Tesla hat die Batterieproduktion in seiner Gigafabrik in Grünheide wieder aufgenommen. „Wir haben jede Menge investiert – in neue Technologie, viel in Anlagentechnik“, sagte Werksleiter André Thierig bei einem internen Event am Dienstag. Grünheide sei nun die „hochautomatisierteste Batteriefabrik von Tesla weltweit“. Tesla hatte in Grünheide bereits zuvor Batterien gefertigt. Nach Angaben von Werksleiter Thierig produzierten die Mitarbeiter rund 100.000 Einheiten eines älteren Batterietyps. Anschließend baute der Konzern die Fertigung um und schuf so die Voraussetzungen für einen neuen Batterietyp. Intern firmiert das Vorhaben unter dem Codenamen „Projekt Coyote“. Das Besondere daran sei, dass in den Batterien Zellen zum Einsatz kämen, die Tesla selbst produziert habe, sagte Thierig. Die Zellfertigung finde allerdings „noch nicht“ in Grünheide statt. „Die kommen aus dem Schwesterwerk in Austin“, sagte der Werksleiter. „Also, wir bekommen die Batteriezellen hier nach Berlin geliefert und verbauen sie dann in Batteriepacks.“ Bald würden sie auch in Fahrzeugen aus Grünheide verbaut werden.';

  message = 'Düsseldorf. Der US-Elektroautobauer Tesla hat die Batterieproduktion in seiner Gigafabrik in Grünheide wieder aufgenommen. Tesla hatte in Grünheide bereits zuvor Batterien gefertigt. Nach Angaben von Werksleiter Thierig produzierten die Mitarbeiter rund 100.000 Einheiten eines älteren Batterietyps. Anschließend baute der Konzern die Fertigung um und schuf so die Voraussetzungen für einen neuen Batterietyp. Intern firmiert das Vorhaben unter dem Codenamen „Projekt Coyote“.' 


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
