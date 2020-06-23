import { Resources } from './../shared/resources';
import { Equipe } from './../model/equipe.model';
import { Observable, Subject } from "rxjs";
import { environment } from '../../environments/environment';
import { DataTablesResponse } from '../model/data.tables.response.model';
import { Injectable } from '@angular/core';
import { CastHttp } from '../seguranca/cast-http';

@Injectable({
  providedIn: 'root',
})

export class EquipeService{
  equipeUrl = `${environment.apiUrl}/${Resources.EQUIPE}/${Resources.VERSAO_1}`;

  constructor(private http: CastHttp) { }

  listar(): Observable<DataTablesResponse> {
    return this.http.get<DataTablesResponse>(`${this.equipeUrl}/${Resources.LISTAR}`);
  }
  salvar(equipe: Equipe): Promise<any>{
    return this.http.post<any>(`${this.equipeUrl}/${Resources.ADICIONAR}`, equipe)
                    .toPromise()
                    .then( response => { response })
                    .catch();
  }
  atualizar(equipe: Equipe): Promise<any>{
    return this.http.put(`${this.equipeUrl}/${Resources.ATUALIZAR}/${equipe.id}`, equipe)
                    .toPromise()
                    .then( response => {
                                         const equipeAtualizado = response;
                                         return equipeAtualizado;
                                       })
                    .catch();
 }
 excluir(codigo: number): Promise<any>{
  return this.http.delete(`${this.equipeUrl}/${Resources.EXCLUIR}/${codigo}`)
                  .toPromise()
                  .then()
                  .catch(() => null);
 }
 getEquipes(): Promise<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.equipeUrl}/${Resources.LIST}`)
    .toPromise()
    .then( response => {
                            return response;
                        });

 }
  porId(codigo: number): Promise<any>{
    return this.http.get<any>(`${this.equipeUrl}/${Resources.PORID}`)
                    .toPromise()
                    .then( response => {
                                         const equipeEncontrado = response as Equipe;
                                         return equipeEncontrado;
                                       })
                    .catch();
 }
}
