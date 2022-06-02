import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
   
  ]
})
export class AuthModule { 
  static forRoot():ModuleWithProviders<AuthModule>{
    return {
      ngModule:AuthModule,
      providers:[
        {
          provide:HTTP_INTERCEPTORS,//informando que é um interceptador http
          //faco isso para o interceptador ser global em qualquer interceptação minha
          useClass: TokenInterceptor,//class que vai ser interceptador
          multi: true,//

        }
      ]
  }
}
}
