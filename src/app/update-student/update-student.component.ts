import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  id!:number;
  student:Student=new Student();
  constructor(private studentService:StudentService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.student = new Student();
    this.id=this.route.snapshot.params['id'];
    this.studentService.getStudentById(this.id).subscribe(data=>{
      this.student=data;
      console.log(data);
      },
      error=>console.log(error))
  }
  updateStudent() {
    this.studentService.updateStudent(this.id, this.student)
      .subscribe(data => {
        console.log(data);
        this.student = new Student();
        this.gotoStudentList();
      }, error => console.log(error));
  }

  onSubmit(){
    this.updateStudent();
  }

  gotoStudentList(){
    this.router.navigate(['students']);
  }

}
