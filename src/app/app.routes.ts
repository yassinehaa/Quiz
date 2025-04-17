import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HistoriqueComponent} from './historique/historique.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'historique', component: HistoriqueComponent }
];
