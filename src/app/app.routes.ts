import { Routes } from '@angular/router';
import { SelectionComponent } from './selection/selection.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RecordComponent } from './record/record.component';
import { SimplifyAiComponent } from './simplify-ai/simplify-ai.component';
import { SumplifyAiResultsComponent } from './simplify-ai/sumplify-ai-results/sumplify-ai-results.component';
import { AiLoaderComponent } from './simplify-ai/ai-loader/ai-loader.component';
import { PronunciationFeedbackComponent } from './pronunciation-feedback/pronunciation-feedback.component';
import { ResponseListComponent } from './response-list/response-list.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'selection', component: SelectionComponent},
    {path: 'pronunc-ai', component: RecordComponent},
    {path: 'response-list', component: ResponseListComponent},
    {path: 'pronunc-ai-result/:id', component: PronunciationFeedbackComponent},
    {path: 'simplify-ai', component: SimplifyAiComponent},
    {path: 'simplify-ai-result', component: SumplifyAiResultsComponent},
];
