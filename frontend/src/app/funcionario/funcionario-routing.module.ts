import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanEnterGuard } from './guards/can-enter.guard';
import { IsNumberGuard } from './guards/is-number.guard';
import { LeavePageGuard } from './guards/Leave-page.-guard';
import { EditFuncionarioComponent } from './pages/edit-funcionario/edit-funcionario.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { ListarFuncionarioComponent } from './pages/listar-funcionario/listar-funcionario.component';
import { NovoFuncionarioComponent } from './pages/novo-funcionario/novo-funcionario.component';

const routes: Routes = [
  {
    path: 'novo-funcionario',
    component: NovoFuncionarioComponent,
    canDeactivate:[
      LeavePageGuard
    ],
    canActivate:[
      CanEnterGuard
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    component: ListarFuncionarioComponent,
    canActivate:[
      CanEnterGuard
    ]
  }, 
  {
    path: ':idFuncionario',
    component: FuncionarioComponent,
    canActivate: [
      IsNumberGuard,
      CanEnterGuard
    ],
  },
  {
    path:'edit/:idFuncionario',
    component:EditFuncionarioComponent,
    canDeactivate:[
      LeavePageGuard
    ],
    canActivate:[
      CanEnterGuard
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FuncionarioRoutingModule { }
