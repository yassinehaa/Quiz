import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique.component.html',
  styleUrl:'historique.component.ts',
})
export class HistoriqueComponent implements OnInit {
  history: any[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('quizHistory');
    this.history = stored ? JSON.parse(stored) : [];
  }
}
