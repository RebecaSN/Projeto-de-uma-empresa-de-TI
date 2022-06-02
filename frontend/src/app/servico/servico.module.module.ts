import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AtribuirFuncionarioComponent } from './pages/atribuir-funcionario/atribuir-funcionario.component';
import { NovoServicoComponent } from './pages/novo-servico/novo-servico.component';
import { EditServicoComponent } from './pages/edit-servico/edit-servico.component';
import { MostrarServicoComponent } from './pages/mostrar-servico/mostrar-servico.component';
import { ListaServicoComponent } from './pages/lista-servico/lista-servico.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicoRoutingeModule } from './servico-routing-module.module';



@NgModule({
  declarations: [
    ListaServicoComponent,
    MostrarServicoComponent,
    EditServicoComponent,
    NovoServicoComponent,
    AtribuirFuncionarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ServicoRoutingeModule,
    ReactiveFormsModule
  ]
  
})
export class Servico { }
