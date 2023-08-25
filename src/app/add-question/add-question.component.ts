import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{

  newQuestion: any = {
    question1: '',
    answer: ''
  };

  constructor(private questionService: QuestionService){}

  onSubmit(): void{
    if(this.newQuestion.question1 && this.newQuestion.answer){
      this.questionService.createQuestion(this.newQuestion).subscribe(
        (response) => {
          console.log('question added!!!!!', response);
          this.newQuestion.question1 = '';
          this.newQuestion.answer = '';
        },
        (error) =>{
          console.error('error adding question', error)
        }
      );
    }
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
