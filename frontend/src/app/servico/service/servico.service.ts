import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private readonly baseURL = 'http://localhost:8080/servicos/servico'

  constructor(
    private http: HttpClient
  ) {}

  getServicos():Observable<Servico[]>{
   return this.http.get<Servico[]>(this.baseURL)
  } 



}
