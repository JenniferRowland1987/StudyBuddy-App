import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { QuestionListComponent } from './question-list/question-list.component';
import { AddQuestionComponent } from './add-question/add-question.component';

import { FavoriteComponent } from './favorite/favorite.component';



@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,    
    AddQuestionComponent,    
    FavoriteComponent    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
