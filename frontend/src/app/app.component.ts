import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './auth/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logged$!:boolean
  
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(){
    this.authService.logged().subscribe(
      (logged)=>{
        this.logged$ = logged
      }
    )//pegando o valor retornado desse logged, pegar o valor que estar sendo retornado do subscribe e guarar dentro dela 
  }
  logout(){
    this.authService.logout()//deixa o subject como falso e ja remove o iten do localstorage
    this.router.navigateByUrl('/auth/login')//quando ele deslocar eu vou direcionar ele para a pagina de login
  }








  //na hora que esse codigo for transofrmado para JS as interface vão parar de existir, o que vai importar é o metodo da classe
}
