import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'https://opentdb.com/api.php';
  private categoryUrl = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient) {}

  getQuestions(
    amount: number,
    category?: number,
    difficulty?: string,
    type: string = 'multiple'
  ): Observable<{ response_code: number; results: QuizQuestion[] }> {
    let url = `${this.baseUrl}?amount=${amount}&type=${type}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    return this.http.get<{ response_code: number; results: QuizQuestion[] }>(url);
  }

  getCategories(): Observable<{ trivia_categories: Category[] }> {
    return this.http.get<{ trivia_categories: Category[] }>(this.categoryUrl);
  }
}
