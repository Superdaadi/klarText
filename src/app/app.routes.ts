import { Routes } from '@angular/router';
import { SelectionComponent } from './selection/selection.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RecordComponent } from './record/record.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'selection', component: SelectionComponent},
    {path: 'pronunc-ai', component: RecordComponent},
];
