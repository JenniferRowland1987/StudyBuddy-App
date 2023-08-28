import { Component, Input, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { QuestionService } from '../question.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  selectedStudentId: number = 0;
  students: any[] = [];
  favorites: any[] = [];
  favoriteQuestions: any[] = [];
  
  
  

  constructor(
    private favoriteService: FavoriteService,
    private questionService: QuestionService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudentsFromService();
    if(this.selectedStudentId !== null){
      this.getFavoritesForStudent(this.selectedStudentId);
    }
  }

  getStudentsFromService() {
    this.studentService.getStudents().subscribe(
      (studentData: any[]) => {
        this.students = studentData;
        console.log('student data',studentData);
      },
      error => {
        console.log(error);
      }
    );
  }

  onStudentSelected() {
    if (this.selectedStudentId !== null) {
      this.getFavoritesForStudent(this.selectedStudentId);
    }
  }

  getFavoritesForStudent(studentId: number) {
    this.favoriteService.getFavorites(studentId).subscribe(
      (data: any[]) => {
        console.log('non parsed favorites', data)
        const questionIds = data.map(favorite => favorite.questionId);
  
        // Fetch the corresponding questions one by one
        this.favoriteQuestions = []; // Clear the array before adding new questions
        for (const questionId of questionIds) {
          this.questionService.getQuestion(questionId).subscribe(
            (question: any) => {
              this.favoriteQuestions.push(question);
            },
            error => {
              console.log(error);
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

 



  toggleAnswer(question: any) {
    question.isAnswerVisible = !question.isAnswerVisible;
  }
}
