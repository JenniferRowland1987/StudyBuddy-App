import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  {path: '', redirectTo: '/questions', pathMatch: 'full'},
  {path: 'questions', component: QuestionListComponent}, 
  {path: 'add-question', component: AddQuestionComponent},
  {path: 'favorites', component: FavoriteComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
