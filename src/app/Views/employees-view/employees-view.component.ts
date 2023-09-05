import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Employee } from 'src/app/Models/employee.=model';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css']
})
export class EmployeesViewComponent implements OnInit {

  dataSource: Employee[] = [new Employee];
  displayedColumns: string[] = [
    'Id',
    'Nombre del empleado',
    'Salario del empleado',
    'Salario Anual del empleado',
    'Edad del empleado',
    'Imagen de perfil'
  ];
  documentIdFilterControl = new FormControl('');


  constructor(
    public employeeService: EmployeeServiceService
  ) { }



  ngOnInit(): void {
    this.GetValuesFromDataBase()
  }

  async GetValuesFromDataBase() {
    await this.employeeService.getAllEmployees().then((response) => {
      if (response.status == 'success') {
        this.dataSource = JSON.parse(response.data)
        return;
      }
    })
  }

  async filterByIdAdvanceFilter() {
    await this.employeeService.getIndividualEmployee(this.documentIdFilterControl.value).then((response) => {
      if (response.status == 'success') {
        this.dataSource = JSON.parse(response.data)
        return;
      }
    })
  }

}
