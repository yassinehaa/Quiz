import { Routes } from '@angular/router';
import {HistoriqueComponent} from './historique/historique.component';
import {QuizComponent} from './quiz/quiz.component';

export const routes: Routes = [
  { path: '', component: QuizComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'quiz', component: QuizComponent }
];
