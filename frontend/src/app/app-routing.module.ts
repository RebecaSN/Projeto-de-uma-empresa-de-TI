import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'funcionario',
    loadChildren: () => { // Lazy Loading
      return import('./funcionario/funcionario.module')
      .then((m) => {
        return m.FuncionarioModule
      })
    }
  },
  {
    path:'servico',
    loadChildren:()=>{
      return import('../app/servico/servico.module.module')
      .then((m)=>{
        return m.Servico
      })
    }
  },
  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {}