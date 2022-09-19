import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  id!:number;
  student!:Student;
  constructor(private studentSerivce:StudentService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.student=new Student();
    this.studentSerivce.getStudentById(this.id).subscribe(data=>{
      this.student=data;
      console.log(data);
    })
  }
  list(){
    this.router.navigate(['students']);
  }

}
