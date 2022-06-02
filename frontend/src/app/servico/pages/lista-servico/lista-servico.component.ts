import { Component, OnInit } from '@angular/core';
import { Servico } from '../../models/interface';
import { ServicoService } from '../../service/servico.service';


@Component({
  selector: 'app-lista-servico',
  templateUrl: './lista-servico.component.html',
  styleUrls: ['./lista-servico.component.css']
})
export class ListaServicoComponent implements OnInit {

  servico: Servico[]=[]

  columns: string[] = ['idServico', 'titulo', 'descricao', 'dataEntrada','StatusServico','actions']

  constructor(
    private servicoService:ServicoService
  ) { }

  recoverServico(){
    this.servicoService.getServicos().subscribe(
      (servico) =>{
        this.servico =servico
      }
    )
  }


  ngOnInit(): void {
  }

}
