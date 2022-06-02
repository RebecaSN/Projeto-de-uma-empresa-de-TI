import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // vamos pegar o token e mandar para a requisição, primeiro precisamos ver se esse token existe no localstorage

  constructor(
    private router:Router,
    private authService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {//ele n pode mudar, tem que ser imutavel, n pode modificar um dado da requisição, n se pode mudar o valor do parametro da requsição
    let token =localStorage.getItem('token')//n posso passar dentro do objeto request os parametros direto, pq ele n pode ser alterado, posso adiconar os cabeçalhos direto ao objeto request, tenho que então clonar, e depois adicionar os cabeçalhos
    
    if(token == null){//caso a chave n exista
      token=''
    }
    const req = request.clone({//essa red é que vai ter o clone do request que eu to recebendo, e vai ser esse req que eu vou mandar 
      setHeaders:{
        Authorizarion:`Bearer ${token}`
      }
    })//na hora de crirar o clone ele ja vai vir com os cabeçalhos
    
    return next.handle(req)//o next é para dar continuidade a requisição//o handlee retorna um observablw também
    .pipe(
      catchError(error=>{//redirecionar o usuario caso o token n funcione mais 
        if(error instanceof HttpErrorResponse){
          if(error.status === 403){
            this.authService.logout()   
            this.router.navigateByUrl('/auth/login')
          }

        }
        return of(error)// o of é um observable que printa os valores que tu coloca no console?
      })
    )
  }  
  
}// é um pattern simples que nos permite interceptar, tratar e gerenciar requisições http, antes mesmo delas serem enviadas ao servidor. Um bom exemplo disso, são os tokens de acesso, onde ao usuário logar no sistema, gera-se um token criptografado com informações relevantes sobre o acesso e esse token é inserido no Header de todas as requisições.
//paramos a requisição, colocamos o token e depois continuamos
//sempre que quisermos passar algo no header da requisição temos que fazer um interceptor
//para qualquer tipo de requisição, post, get, etc. e n precisamos repetir isso para qualquer metodo que a gente passe as requisições