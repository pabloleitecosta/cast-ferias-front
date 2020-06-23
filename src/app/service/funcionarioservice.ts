import { Funcionario } from './../model/funcionario.model';
import { DataTablesResponse } from './../model/data.tables.response.model';
import { Observable } from 'rxjs';
import { CastHttp } from './../seguranca/cast-http';
import { Resources } from './../shared/resources';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService{
  funcionarioUrl = `${environment.apiUrl}/${Resources.FUNCIONARIO}/${Resources.VERSAO_1}`;
  constructor(private http: CastHttp) { }
  listar(): Observable<DataTablesResponse> {
    return this.http.get<DataTablesResponse>(`${this.funcionarioUrl}/${Resources.LISTAR}`);
  }

  porId(codigo: number): Promise<any>{

    return this.http.get<any>(`${this.funcionarioUrl}/${Resources.PORID}/${codigo}`)
                    .toPromise()
                    .then( response => {
                                         const funcEncontrado = response as Funcionario;
                                         return funcEncontrado;
                                       })
                    .catch();
 }

  salvar(funcionario: Funcionario): Promise<any>{
    return this.http.post<any>(`${this.funcionarioUrl}/${Resources.ADICIONAR}`, funcionario)
                    .toPromise()
                    .then( response => { response })
                    .catch();
  }
  atualizar(funcionario: Funcionario): Promise<any>{
    return this.http.put(`${this.funcionarioUrl}/${Resources.ATUALIZAR}/${funcionario.codigo}`, funcionario)
                    .toPromise()
                    .then( response => {
                                         const funcionarioAtualizado = response;
                                         return funcionarioAtualizado;
                                       })
                    .catch();
 }
 excluir(codigo: number): Promise<any>{
  return this.http.delete(`${this.funcionarioUrl}/${Resources.EXCLUIR}/${codigo}`)
                  .toPromise()
                  .then()
                  .catch(() => null);
 }
 getFuncionarios(): Promise<Funcionario[]> {
  return this.http.get<Funcionario[]>(`${this.funcionarioUrl}/${Resources.LIST}`)
  .toPromise()
  .then( response => {
                          return response;
                      });
 }
 porMaatricula(codigo: number): Promise<any>{
  return this.http.get<any>(`${this.funcionarioUrl}/${Resources.PORID}`)
                  .toPromise()
                  .then( response => {
                                       const funcionarioEncontrado = response as Funcionario;
                                       return funcionarioEncontrado;
                                     })
                  .catch();
 }
}
