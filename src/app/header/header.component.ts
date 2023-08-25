import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  students: any[] = [];
  @Output() studentSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private studentService: StudentService){}

  ngOnInit(): void {
    this.getStudentsFromService();
  }

  getStudentsFromService(){
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

  selectStudent(student : any){
    this.studentSelected.emit(student);
  }
  

}
