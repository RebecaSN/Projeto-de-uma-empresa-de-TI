import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  Funcionarioid!: number| null 
  funcionario!:Funcionario

  constructor(
    private funHttpService:FuncionarioHttpService,
    private http : HttpClient,
    private route:ActivatedRoute 

  ) { }

  ngOnInit(): void {

    this.Funcionarioid = parseInt(this.route.snapshot.paramMap.get('idFuncionario') || '')

    this.funHttpService.getFuncionarioById(this.Funcionarioid).subscribe(
      (f)=>{
       this.funcionario=f
       }
     )
  }

}
