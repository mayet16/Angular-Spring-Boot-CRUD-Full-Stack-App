import { Observable } from "rxjs";
import{StudentService} from '../student.service';
import{Student} from '../student';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  students!:Observable<Student[]>;
  constructor(private studentService:StudentService, private router: Router) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
    this.students=this.studentService.getStudentList();
  }

  updateStudent(id:number){
    this.router.navigate(['update-student',id]);
  }

  studentDetail(id:number){
    this.router.navigate(['student-detail', id]);
  }

  deleteStudent(id: number){
    if(confirm("Are you sure to delete ")) {
    this.studentService.deleteStudent(id).subscribe(data=>{
      console.log(data);
      this.getStudents();
    })
  }
}
  gotocreate(){
    this.router.navigate(['add-stud']);
  }
}
