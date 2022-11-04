import { Observable } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { CreateEmployeeComponent } from "../create-employee/create-employee.component";
@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees!: Observable<Employee[]>;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'emailId', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService,
    private router: Router,public dialog: MatDialog) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employeeService.getEmployeesList().subscribe(
      data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    if(confirm("Are you sure to delete ")) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
  updateEmployee(row:any){
    this.dialog.open(CreateEmployeeComponent, {
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='Update'){
      this.reloadData();
      }
          });
  }
  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }
  gotocreate(){
    this.router.navigate(['add']);
  }

  openDialog() {
    this.dialog.open(CreateEmployeeComponent, {
    }).afterClosed().subscribe(val=>{
if(val==='Save'){
this.reloadData();
}
    });
  }
}