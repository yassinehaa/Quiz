import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService, QuizQuestion } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent  implements OnInit {
  private quizService = inject(QuizService);
  questions: QuizQuestion[] = [];
  currentIndex = 0;
  score = 0;
  showResult = false;
  quizStarted = false;
  username = '';

  selectedCategory = 9;
  selectedDifficulty = 'easy';

  categories = [
      {id:9,name:"General Knowledge"},
      {id:10,name:"Entertainment: Books"},
      {id:11,name:"Entertainment: Film"},
      {id:12,name:"Entertainment: Music"},
      {id:13,name:"Entertainment: Musicals & Theatres"},
      {id:14,name:"Entertainment: Television"},
      {id:15,name:"Entertainment: Video Games"},
      {id:16,name:"Entertainment: Board Games"},
      {id:17,name:"Science & Nature"},
      {id:18,name:"Science: Computers"},
      {id:19,name:"Science: Mathematics"},
      {id:20,name:"Mythology"},
      {id:21,name:"Sports"},
      {id:22,name:"Geography"},
      {id:23,name:"History"},
      {id:24,name:"Politics"},
      {id:25 ,name:"Art"},
      {id:26,name:"Celebrities"},
      {id:27,name:"Animals"},
      {id:28,name:"Vehicles"},
      {id:29,name:"Entertainment: Comics"},
      {id:30,name:"Science: Gadgets"},
      {id:31,name:"Entertainment: Japanese Anime & Manga"},
      {id:32,name:"Entertainment: Cartoon & Animations"}
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
      username: this.username,
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

  protected readonly name = name;
}
