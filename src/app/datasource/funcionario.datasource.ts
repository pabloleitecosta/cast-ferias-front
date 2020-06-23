import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';
import { FuncionarioService } from './../service/funcionarioservice';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { Funcionario } from './../model/funcionario.model';

export class FuncionarioDataSource implements DataSource<Funcionario> {
  public funcionariosSubject = new BehaviorSubject<Funcionario[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  recordsTotal;
  public loading$ = this.loadingSubject.asObservable();
  constructor(private funcionarioService: FuncionarioService){}
  connect(collectionViewer: CollectionViewer): Observable<Funcionario[]> {
    return this.funcionariosSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.funcionariosSubject.complete();
    this.loadingSubject.complete();
  }
  carregar(){
    this.loadingSubject.next(true);
    this.funcionarioService.listar().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe(response => {
                this.funcionariosSubject.next(response['content']);
                this.recordsTotal = response['pageSize'];
            });
  }
  changeLoading(valor: boolean) {
    this.loadingSubject.next(valor);
  }
}
