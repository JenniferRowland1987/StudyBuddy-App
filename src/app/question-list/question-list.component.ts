import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { FavoriteService } from '../favorite.service';
import { ImplicitReceiver } from '@angular/compiler';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: any[] = [];
  

  constructor(private dataService: QuestionService){}

  ngOnInit(): void {
    this.getQuestionsFromService();
  }

  getQuestionsFromService()
  {
    console.log('method called')
    this.dataService.getQuestions().subscribe(
      (data: any[]) =>{
        console.log('get Questions Here!')
        console.log(data)
        this.questions = data;
        isAnswerVisible: false; //Jen screwing around
      },
      (error) => {
        console.log(error)
      }      
    );
  }
  //screwing around again below
  toggleAnswer(question: any) {
    question.isAnswerVisible = !question.isAnswerVisible;
  }

  onStudentSelected(student: any){
    console.log('selected student', student);
  }

  createFavorite(questionId: number){
    
  }

}
