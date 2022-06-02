import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../dialog/dialog.component';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.css']
})
export class ListarFuncionarioComponent implements OnInit {

  funcionarios: Funcionario[] = []

  columns: string[] = ['idFuncionario', 'nome', 'email', 'actions']

  constructor(
    private funHttpService: FuncionarioHttpService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar
  ) { }
  recoverFuncionario(){
    this.funHttpService.getFuncionarios().subscribe(
      (funcionarios) => {
        this.funcionarios = funcionarios
      
    })
  }

  ngOnInit(): void {
    this.funHttpService.getFuncionarios().subscribe(
      (funcionarios) => {
        this.funcionarios = funcionarios
      
    })
  }
 
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent) 
  
   dialogRef.afterClosed().subscribe(
    canDelete=> {
      if(canDelete){//como é uma variavel booleana, eu n preciso colocar ==true, por mais que eu possa
       this.funHttpService.deletarFuncionario(id)
       .subscribe(
      
         ()=>{
          this.snackbar.open('Funcionario deletado!','okay',{
            duration:3000,
            horizontalPosition:'left',
            verticalPosition:'top'
          })
          this.recoverFuncionario()
          //depois que eu deletar, ele vai entrar de novo na api, e pegar os dados atalziados do servidor, e colocar aqui
         }//função de sucesso
       )
      }  
    })//recuperando o valor true o false
   }
  
  }

