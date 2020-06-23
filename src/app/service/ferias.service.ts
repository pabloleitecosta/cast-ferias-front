import { FeriasFuncionario } from './../model/ferias.model';
import { DataTablesResponse } from './../model/data.tables.response.model';
import { Observable } from 'rxjs';
import { CastHttp } from './../seguranca/cast-http';
import { Resources } from './../shared/resources';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeriasService{
  feriasUrl = `${environment.apiUrl}/${Resources.FERIAS}/${Resources.VERSAO_1}`;
  constructor(private http: CastHttp) { }
  listar(): Observable<DataTablesResponse> {
    return this.http.get<DataTablesResponse>(`${this.feriasUrl}/${Resources.LISTAR}`);
  }

  porId(codigo: number): Promise<any>{

    return this.http.get<any>(`${this.feriasUrl}/${Resources.PORID}/${codigo}`)
                    .toPromise()
                    .then( response => {
                                         const funcEncontrado = response as FeriasFuncionario;
                                         return funcEncontrado;
                                       })
                    .catch();
 }

  salvar(ferias: FeriasFuncionario): Promise<any>{
    return this.http.post<any>(`${this.feriasUrl}/${Resources.ADICIONAR}`, ferias)
                    .toPromise()
                    .then( response => { response })
                    .catch();
  }
  atualizar(ferias: FeriasFuncionario): Promise<any>{
    return this.http.put(`${this.feriasUrl}/${Resources.ATUALIZAR}/${ferias.codigo}`, FeriasFuncionario)
                    .toPromise()
                    .then( response => {
                                         const feriasAtualizado = response;
                                         return feriasAtualizado;
                                       })
                    .catch();
 }
 excluir(codigo: number): Promise<any>{
  return this.http.delete(`${this.feriasUrl}/${Resources.EXCLUIR}/${codigo}`)
                  .toPromise()
                  .then()
                  .catch(() => null);
 }

 getFerias(): Promise<FeriasFuncionario[]> {
  return this.http.get<FeriasFuncionario[]>(`${this.feriasUrl}/${Resources.LIST}`)
  .toPromise()
  .then( response => {
                          return response;
                      });
 }
 porMaatricula(codigo: number): Promise<any>{
  return this.http.get<any>(`${this.feriasUrl}/${Resources.PORID}`)
                  .toPromise()
                  .then( response => {
                                       const funcionarioEncontrado = response as FeriasFuncionario;
                                       return funcionarioEncontrado;
                                     })
                  .catch();
 }
}
