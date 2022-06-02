import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmExitDialogComponent } from '../../components/confirm-exit-dialog/confirm-exit-dialog.component';
import { CanDeactivate } from '../../models/canDeactivate';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})
export class EditFuncionarioComponent implements OnInit, CanDeactivate {

  fun:Funcionario={
    nome:'',
    email:''
  }

  funcionario:FormGroup=this.fb.group({
    nome:['',[Validators.required]],
    email:['', [Validators.required,Validators.email]],
    foto:[null]//provavelmente a gente pode mandar como nula na hora de fazer a requisição, no primeiro momento, no valor inicial
  })
  foto!:File

  constructor(
    private route:ActivatedRoute,
    private funHttpService:FuncionarioHttpService,
    private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private router:Router,
    private dialog:MatDialog
  ) { }//activedRoute: objeto que permite a gente acessar os dados da rota atual, que ta ativa agora, o router é um objeto que permite que a gente dentro do arquivo typescript permite que a gente faça a navegação entre as paginas
  canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.funcionario.dirty){
      const dialogRef=this.dialog.open(ConfirmExitDialogComponent)
      return dialogRef.afterClosed()
    }
    return true 
  }

  ngOnInit(): void {
    const id:number = parseInt(this.route.snapshot.paramMap.get('idFuncionario') || '0')//quando tivermos rotas filhas, é melhor fazer como observablw
      

    this.funHttpService.getFuncionarioById(id)
    .subscribe(
      (f)=>{
       this.fun=f
       this.funcionario.patchValue({//setar um valor dentro do formulário//depois do subscribe quando a gente recuperar, ele vai assumir os valores que ele passou
         nome:this.fun.nome,
         email:this.fun.email
       })
      }
    )
    
  }//
  submit():void{
    this.fun.nome=this.funcionario.value.nome//recuperando os valores do form grup e colocando nso seus respectivos campos 
    this.fun.email=this.funcionario.value.email

    this.funHttpService.updateFuncionario(this.fun).subscribe(
      ()=>{
        if(this.foto != undefined){
          const formData = new FormData()//para mandar arquivos para apis, precisa usar o formData, é um objeto que permite isso

          formData.append('foto',this.foto)
         //append: criando um novo campo no formuário
         //tem que passar o novo do item e o valor dele
         //ele também é para mandar para a api

         const filename=`funcionario-${this.fun.idFuncionario}.${this.foto.type.split('/')[1]}`//criei o nome do arquivo//to fazendo aqui a requisição http
         this.funHttpService.addFoto(this.fun.idFuncionario || 0, formData,filename).subscribe(
          ()=>{
            this.funcionario.reset()
            this.showSucessoMessageAndRedirect()
          },
          (e:HttpErrorResponse)=>{
            this.showErrorMessage(e)
           
          }
        )
        }else{
          this.funcionario.reset()
          this.showSucessoMessageAndRedirect()
        }
      },
      (e:HttpErrorResponse)=>{
        this.showErrorMessage(e)
       
      }//quando a requisção http acusa um erro, o objeto que ela retorna para a gente é um objeto chamado httpeerrorResponse
    )

  }
  fileChange(event:any):void{
    this.foto=event.targat.files[0]
  }
  showSucessoMessageAndRedirect():void{
    this.snackbar.open('Funcionario salvo','ok',{
      duration:3000,
      horizontalPosition:'left',
      verticalPosition:'top'
    })
    this.router.navigateByUrl('/funcionario')
}
 showErrorMessage(e:HttpErrorResponse):void{
    this.snackbar.open(`Ocorreu um erro no Salvamento!(Erro ${e.status})`,'ok',{
      duration:3000,
      horizontalPosition:'left',
      verticalPosition:'top'
    })
  }
}
