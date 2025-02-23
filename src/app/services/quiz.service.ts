import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IQuiz } from '../interfaces/quiz.interface';
import { quiz } from 'src/assets/data/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  getQuestions(): Observable<IQuiz> {
    return of(quiz);
  }
}
