import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UsuarioJWT } from '../models/usuario-jwt';

@Injectable(
  {providedIn:'root'}
)
export class AuthenticationService {

  private logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false) //declarando um observable, o beraversubject obriga ter um valor inicial para o subject//e ele ja me dizer se o usuario ta logado ou n 
  
  private readonly baseURL:string = 'http://localhost:8080/' // readonly para informar que o conteudo de uma classe, ele só vai ser para leitura, não posso modificar, mesma ideia do final
  //n precisa tipar, mas é bom 

  constructor(
    private http:HttpClient
  ) { }
  
  login(usuario: UsuarioJWT):Observable<{Authorization:string}>{//criando uma interface local, pegando o token que acabou de ser gerado//o obervable precisa me retornar o token
    return this.http.post <{Authorization:string}>(`${this.baseURL}login`, usuario)
         
    .pipe(//permite que a gente manipule os dados que estão vindo da api, na vsdd dos observables em geral 
    tap((token)=>{
      localStorage.setItem('token',token.Authorization)//guardando no localstorage para poder persistir ele
      this.logged$.next(true)//depois do submit o usuario esta logado e o valor dessa variavel é true
    })//consome o dado, mas n retorna nada, como se fosse o foreach os arrays
    )
  }
  
  logged():Observable<boolean>{
   this.logged$.next(localStorage.getItem('token')!= null)
   return this.logged$.asObservable()
  }

  logout() {
    localStorage.removeItem('token')
    this.logged$.next(false)
  }






}
