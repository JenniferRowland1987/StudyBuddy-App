import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';
import { FavoriteService } from '../favorite.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  @Input() selectedStudentId: number | null = null;

  questions: any[] = [];
  students: any[] = [];
  selectedStudentForFavorite: number = 0;

  constructor(
    private dataService: QuestionService,
    private favoriteService: FavoriteService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getQuestionsFromService();
    this.getStudentsFromService();
    console.log('selected student id:', this.selectedStudentForFavorite);
  }

  getQuestionsFromService() {
    console.log('method called');
    console.log('selected student', this.selectedStudentForFavorite);
    this.dataService.getQuestions().subscribe(
      (data: any[]) => {
        console.log('get Questions Here!');
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleAnswer(question: any) {
    question.isAnswerVisible = !question.isAnswerVisible;
  }

  onStudentSelectedForFavorite() {
    console.log('selected student', this.selectedStudentForFavorite);
  }

  addToFavoritesForStudent(studentId: number, questionId: number) {
    if (studentId !== null) {
      this.favoriteService.createFavorite(studentId, questionId).subscribe(
        () => {
          console.log('Question added to favorites');
        },
        error => {
          console.error('Error adding question to favorites:', error);
        }
      );
    } else {
      console.error('No student selected.');
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
}
