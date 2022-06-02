import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaServicoComponent } from './pages/lista-servico/lista-servico.component';
import { NovoServicoComponent } from './pages/novo-servico/novo-servico.component';
import { MostrarServicoComponent } from './pages/mostrar-servico/mostrar-servico.component';
import { EditServicoComponent } from './pages/edit-servico/edit-servico.component';
import { AtribuirFuncionarioComponent } from './pages/atribuir-funcionario/atribuir-funcionario.component';


const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    component:ListaServicoComponent
  },
  {
    path:'novo-servico',
    component:NovoServicoComponent,
  },
  {
    path:':idServico',
    component:MostrarServicoComponent
  },
  {
    path:'servicoeditar/:idServico',
    component:EditServicoComponent
  },
  {
    path:'atribuirServico/:idServico/:idFuncionario',
    component:AtribuirFuncionarioComponent
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
export class ServicoRoutingeModule { }
