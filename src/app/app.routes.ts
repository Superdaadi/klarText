import { Routes } from '@angular/router';
import { SelectionComponent } from './selection/selection.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SimplifyAiComponent } from './simplify-ai/simplify-ai.component';
import { SumplifyAiResultsComponent } from './sumplify-ai-results/sumplify-ai-results.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'selection', component: SelectionComponent},
    {path: 'simplify-ai', component: SimplifyAiComponent},
    {path: 'simplify-ai-result', component: SumplifyAiResultsComponent},
];
