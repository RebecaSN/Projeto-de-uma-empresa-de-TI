import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable(
  {
    providedIn:'root'
  }
)
export class FuncionarioHttpService {

  private readonly baseURL = 'http://localhost:8080/servicos/funcionario'

  constructor(
    private http: HttpClient
  ) {}

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.baseURL)
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseURL}/${id}`)
  }
  deletarFuncionario(id:number):Observable<void>{//na api ela precisa do id do funcionario para poder apagar
   return this.http.delete<void>(`${this.baseURL}/${id}`)
  }//como o observable é void, no delete também precisa ser void

  CriarUmFuncionario(funcionario:Funcionario):Observable<Funcionario>{//retorna um funcionario que a gente acabou de salvar
    return this.http.post<Funcionario>(this.baseURL,funcionario)//
  }//como o post é para salvar dados na api, a gente passar a url que vamos acessar e tem que passar os dados que vou salvar na api, que está dentro do parametro funcionario
  
  addFoto(id:Number, data:FormData, filename:String):Observable<void>{
   return this.http.post<void>(`${this.baseURL}/envioFoto/${id}?nome=${filename}`,data)//depois o ponto de ?, eu passo o parametro que a api exige, o nme que tem que ser passado o arquivo
  //passamos as '?'para passar os query params nas rotas, a partir dos pontos de interrogaçao tudo o que for passado é query params
  }/*quando queremos mandar video, imagem ou audio para api, precisamos de outra forma de 
     mandar os dads, já que antes a gente mandava por json, mas agora a gente vai mandar pelo multipart
     uma especie de json para mandar arquivo*/
  //o ,data: é o pametro do tipo formdata que estamos passando, quando queremos mandar um arquivo a gente tem que mandar ele encapsulado em um arquivo do tipo formdata, no metodo post, além do link tem que passar quais os dados que ele tem que salvar para a api

 updateFuncionario(funcionario:Funcionario):Observable<Funcionario>{
   return this.http.put<Funcionario>(`${this.baseURL}/${funcionario.idFuncionario}`,funcionario)
 }

} 
