import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Employee } from 'src/app/Models/employee.=model';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css'],
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
      if (response.exception == "Too Many Attempts.") {
        this.Alert("No podemos responder tu solicitud en este momento intenta en el boton buscar Todos", "Servidor Ocupado", 'warning');
        return;
      }

      if (response.status == 'success') {
        this.dataSource = JSON.parse(response.data)
        return;
      }
    }).catch(() => { this.Alert("Se presento un error en la consulta", "Error", 'error'); })
  }

  async filterByIdAdvanceFilter() {
    await this.employeeService.getIndividualEmployee(this.documentIdFilterControl.value).then((response) => {

      if (response.exception == "Too Many Attempts.") {
        this.Alert("No podemos responder tu solicitud en este momento", "Servidor Ocupado", 'warning');
        return;
      }

      if (response.status == 'success') {
        let list: Employee[] = [JSON.parse(response.data)];
        this.dataSource = list
        return;
      }
    }).catch(() => { this.Alert("El Numero ingresado no es valido", "Ingresa un valor valido", 'error'); })
  }

  Alert(message: string, title: string, icon: SweetAlertIcon) {
    Swal.fire({
      icon: icon,
      title: title,
      html: message
    })
  }

}
