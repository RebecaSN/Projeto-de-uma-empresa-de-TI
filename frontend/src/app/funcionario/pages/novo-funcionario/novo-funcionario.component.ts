import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ConfirmExitDialogComponent } from '../../components/confirm-exit-dialog/confirm-exit-dialog.component';
import { CanDeactivate } from '../../models/canDeactivate';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.css']
})
export class NovoFuncionarioComponent implements OnInit, CanDeactivate {

  @ViewChild('fileInput')
  fileInput!: ElementRef

  funcionario: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    foto: ['']
  })

  foto!:File //tipo da propriedade é do JS, existe objetos do tipo file//essa prppriedade vai ter o seu valor o campo do input do arquivo

  private canExit!:boolean
  
  constructor(
    private fb: FormBuilder,
    private funHttpService:FuncionarioHttpService,
    private snackbar:MatSnackBar,
    private router:Router,
    private dialog:MatDialog,
    private authService:AuthenticationService 
  ) { }
  canDeactivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    this.authService.logged()
    .subscribe(logged=>{
    this.canExit = !logged
    })
    
    if(this.funcionario.dirty){ 
      const ref=this.dialog.open(ConfirmExitDialogComponent)

      return ref.afterClosed()//observable do tipo booleano
    }else{
      return true
    }
  }

  ngOnInit(): void {
  }

  selectImage(): void {
    this.fileInput.nativeElement.click()
  }
  submit():any{
    const funcionario=this.funcionario.value //vai retornar os valor dos campos nome, email e foto
    funcionario.foto=null//vou fazer com o valor da prorpiedade foto, que é o caminho falso que o o angula formes passa, esteja vazio.
    this.funHttpService.CriarUmFuncionario(funcionario).subscribe(//o subscribe é para o obserble poder funcionar
      (funcionario)=>{//preciso passar esse parametro, porque na rota precisa ter o id do funcionario, e eu so vou ter o id se eu recuperar esse valor
        if(this.foto != undefined){
          const formData:FormData=new FormData()
          formData.append('foto', new Blob([this.foto],{type:this.foto.type}))//blob é um arquivo, aqui a gente ta transoformou o tipo file em blob
          //bloc pe um objeto, o blob é algo a mais a um arquivo, que é o que utilizamos para poder mandar, dai eu crio um objeto bob,e na sua cração eu passo o arquivo, e depois eu falo qual o tipo do arquivo dentro do blob
          //apend é metodo do formdata para arquivos
          const filename = `funcionario-${funcionario.idFuncionario}.${this.foto.type.split("/")[1]}`///preciso fazer essa parte para ter a extenção do arquivo, a propriedade tpe ela n retorna a extenção do arquivo
          //ela retorna o type (image/jpn), o que é o arquiv(imagem, audio, video etc) e depois a extenção do auquivo, como eu quero somente a extenção do arquivo, eu uso esse metodo para pegar só a extenção, e como ele ta na posição 1, eu pego ela
          this.funHttpService.addFoto(funcionario.idFuncionario || 0, formData,filename)//se o id do funcionario n existir, ele vai colocar o valor zero
           .subscribe(
             ()=>{
               this.funcionario.reset()
              this.showSucessoMessageAndRedirect()
             },
             (e:HttpErrorResponse)=>{//vai me retornar um objeto do tipo htto error response, a partit dele, eu tenho acesso aos dados retornados do erro da api
              this.showErrorMessage(e)
            }
           )
        }else{
          this.funcionario.reset()//depois que eu mandar, ele vai resetar o formulário, deixar ele vazio
          this.showSucessoMessageAndRedirect()
        }
      },
      (e:HttpErrorResponse)=>{//vai me retornar um objeto do tipo htto error response, a partit dele, eu tenho acesso aos dados retornados do erro da api
       this.showErrorMessage(e)
      }
    )
  }
  fileChange(event:any){//filelist: um array de arquivos, o file é o arqquivo em si, o que tinha anets disso era só um caminho, 
   this.foto = event.target.files[0]   //sempre manda uma list, faço isso para eu pegar um arquivo apenas
  
  }//o event change e executado em todos os inputs, e eh executado uando o valor do input foi alterado(ou seja, alguem colocou um arquivo nele, e eu preciso recuperar esse arquivo)
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
