import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:FormGroup = this.fb.group({
    login:['',[Validators.required]],
    password:['',[Validators.required, Validators.minLength(4)]]
  })
  constructor(
    private authService:AuthenticationService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  submit():void{
    this.authService.login(this.usuario.value)
    .subscribe(
      ()=>{
        this.router.navigateByUrl('/funcionario')//depois da redirecionando
      }
    )
  }

}
