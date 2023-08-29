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
        console.log('raw favorite list', data)
        this.favorites = data;

        const questionIds = data.map(favorite => favorite.questionId); 
        
        this.favoriteQuestions = []; 
        for (const questionId of questionIds) {
          this.questionService.getQuestion(questionId).subscribe(
            (question: any) => {
              this.favoriteQuestions.push(question);
              console.log('cooked favorites list',this.favoriteQuestions)
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

  removeFavoriteForStudent(studentId: number, questionId: number) {
    console.log('student Id', studentId);
    console.log('question id', questionId);
    console.log('favorite array', this.favorites)

    

    const favorite = this.favorites.find(f => f.studentId == studentId && f.questionId == questionId);
    if (favorite) {
      this.favoriteService.deleteFavorite(favorite.id).subscribe(
        () => {
          console.log('Favorite removed successfully');
          alert('Removed from favorites!');
          const index = this.favoriteQuestions.findIndex(q => q.id == questionId);
          if (index !== -1) {
            this.favoriteQuestions.splice(index, 1);
          }
        
        },
        error => {
          console.error('Error removing favorite:', error);
        }
      );
    } else {
      console.error('Favorite not found.');
    }
  }
}

