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

  selectedStudentId: number | null = null;
  favorites: any[] = [];
  favoriteQuestions: any[] = [];
  students: any[] = [];
  questions: any[] = [];

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
      (data: any[]) => {
        this.students = data;
        console.log(data);
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

 /* getFavoritesFromService() {
    console.log('method called');
    this.favoriteService.getAllFavorites().subscribe(
      (data: any[]) => {
        console.log('get ALL favorites Here!');
        console.log(data);
        this.favorites = data;
      },
      (error) => {
        console.log(error);
      }      
    );
  } */

  getStudentName(studentId: number): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? student.username : 'Unknown Student';
  }

  getQuestionText(questionId: number): string {
    const question = this.questions.find(q => q.id === questionId);
    return question ? question.question1 : 'Unknown Question';
  }
}
