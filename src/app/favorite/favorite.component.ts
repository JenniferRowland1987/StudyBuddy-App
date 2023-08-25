import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { StudentService } from '../student.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  constructor(
    private favoriteService: FavoriteService,
    private questionService: QuestionService,
    private studentService: StudentService
  ){}

  newFavorite: any = {
    studentId: '',
    questionId: ''
  };

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 /* getFavoritesFromService(studentId: number)
  {
    console.log('method called')
    this.favoriteService.getFavorites(studentId).subscribe(
      (data: any[]) =>{
        console.log('get Questions Here!')
        console.log(data)
        this.getFavoritesFromService = data;
        
      },
      (error) => {
        console.log(error)
      }      
    );
  } */


  onClick(): void{
    if(this.newFavorite.studentId && this.newFavorite.questionId){
      this.favoriteService.createFavorite(this.newFavorite.studentId, this.newFavorite.questionId).subscribe(
        (response) => {
          console.log('favorite', response);         
        },
        (error) =>{
          console.error('error adding question', error)
        }
      );
    }
  }





}
