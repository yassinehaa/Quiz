import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService, QuizQuestion } from '../services/quiz.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private quizService = inject(QuizService);
  questions: QuizQuestion[] = [];
  currentIndex = 0;
  score = 0;
  showResult = false;
  quizStarted = false;

  selectedCategory = 9; // default: General Knowledge
  selectedDifficulty = 'easy';

  categories = [
    { id: 9, name: 'General Knowledge' },
    { id: 21, name: 'Sports' },
    { id: 23, name: 'History' },
    { id: 11, name: 'Film' },
    { id: 14, name: 'TV' },
    { id: 17, name: 'Science & Nature' },
  ];

  ngOnInit(): void {}

  startQuiz() {
    this.quizStarted = true;
    this.quizService.getQuestions(10, this.selectedCategory, this.selectedDifficulty)
      .subscribe(res => {
        this.questions = res.results;
        this.currentIndex = 0;
        this.score = 0;
        this.showResult = false;
      });
  }

  checkAnswer(selected: string) {
    const correct = this.questions[this.currentIndex].correct_answer;
    if (selected === correct) {
      this.score++;
    }
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.showResult = true;
      this.saveToHistory();
    }
  }

  shuffleAnswers(question: QuizQuestion): string[] {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    return allAnswers.sort(() => Math.random() - 0.5);
  }

  saveToHistory() {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const result = {
      date: new Date().toLocaleString(),
      score: this.score,
      total: this.questions.length,
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty,
    };
    localStorage.setItem('quizHistory', JSON.stringify([...history, result]));
  }

  restartQuiz() {
    this.quizStarted = false;
    this.questions = [];
  }
}
