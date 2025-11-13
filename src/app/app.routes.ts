import { Routes } from '@angular/router';
import { SelectionComponent } from './selection/selection.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'selection', component: SelectionComponent},
];
