import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"
import { QuizService } from 'src/app/services/quiz.service';
import { IQuestion } from 'src/app/interfaces/quiz.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title: string = "";
  questions: IQuestion[] = [];
  questionSelected!: IQuestion;
  answers: string[] = [];
  answerSelected: string = "";
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;
  sub!: Subscription;

  constructor(private readonly quizService: QuizService) {}

  ngOnInit(): void {
    this.sub = this.quizService.getQuestions().subscribe((questions) => {
      this.finished = false;
      this.title = questions.title;
      this.questions = questions.questions;
      this.questionIndex = 0;
      this.questionSelected = questions.questions[0];
      this.questionMaxIndex = this.questions.length;
    })
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(anwsers: string[]) {
    const result = anwsers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    })
    return result;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
