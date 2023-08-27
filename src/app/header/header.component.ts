import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  students: any[] = [];
  selectedStudentId: number | null = null;

  @Output() studentSelected: EventEmitter<number> = new EventEmitter<number>();

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

  onStudentSelected(event: any) {
    const studentId = event.target.value;
    if (studentId) {
      this.studentSelected.emit(studentId);
    }
  }
}
